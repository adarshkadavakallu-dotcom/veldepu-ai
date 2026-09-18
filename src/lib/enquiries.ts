/**
 * Enquiry submission boundary.
 *
 * The UI only talks to `submitEnquiry`. Today it resolves locally; later this
 * single function can be swapped for a server function / API call
 * (Frontend -> API -> Backend -> Database) without touching any component.
 */

export type EnquiryKind = "contact" | "audit";

export type EnquiryPayload = {
  kind: EnquiryKind;
  submittedAt: string;
  fields: Record<string, string>;
};

export type EnquiryResult = { ok: true; reference: string } | { ok: false; message: string };

export function buildEnquiryPayload(kind: EnquiryKind, data: FormData): EnquiryPayload {
  const fields: Record<string, string> = {};
  for (const [key, value] of data.entries()) fields[key] = String(value).trim();
  return { kind, submittedAt: new Date().toISOString(), fields };
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (!payload.fields["email"]) {
    return { ok: false, message: "We could not send your request. Please check your details and try again." };
  }
  return { ok: true, reference: `VLD-${payload.submittedAt.slice(2, 10).replace(/-/g, "")}` };
}
