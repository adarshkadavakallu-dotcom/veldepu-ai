/**
 * Enquiry submission boundary.
 *
 * The UI only talks to `submitEnquiry`.
 * This function stores the enquiry in Supabase and then
 * triggers the email notification through the Supabase Edge Function.
 */

import { supabase } from "@/integrations/supabase/client";

export type EnquiryKind = "contact" | "audit";

export type EnquiryPayload = {
  kind: EnquiryKind;
  submittedAt: string;
  fields: Record<string, string>;
};

export type EnquiryResult =
  | { ok: true; reference: string }
  | { ok: false; message: string };

export function buildEnquiryPayload(
  kind: EnquiryKind,
  data: FormData,
): EnquiryPayload {
  const fields: Record<string, string> = {};

  for (const [key, value] of data.entries()) {
    fields[key] = String(value).trim();
  }

  return {
    kind,
    submittedAt: new Date().toISOString(),
    fields,
  };
}

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  try {
    // 1. Save the enquiry in Supabase
    const { error } = await supabase
      .from("enquiries")
      .insert({
        kind: payload.kind,
        fields: payload.fields,
      });

    if (error) {
      console.error("Enquiry insert error:", error);

      return {
        ok: false,
        message: error.message,
      };
    }

    // 2. Send the enquiry email notification
    const { error: emailError } = await supabase.functions.invoke(
      "send-enquiry-email",
      {
        body: {
          record: {
            kind: payload.kind,
            fields: payload.fields,
            created_at: payload.submittedAt,
          },
        },
      },
    );

    if (emailError) {
      console.error("Enquiry email error:", emailError);
    }

    // 3. Return success to the website
    return {
      ok: true,
      reference: `VLD-${payload.submittedAt
        .slice(2, 10)
        .replace(/-/g, "")}`,
    };
  } catch {
    return {
      ok: false,
      message: "We could not send your request. Please try again.",
    };
  }
}