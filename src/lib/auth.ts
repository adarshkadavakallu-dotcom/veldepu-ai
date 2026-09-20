/**
 * Authentication boundary.
 *
 * Every component talks to these helpers instead of the auth client directly,
 * so the underlying provider can change without touching the UI.
 */
import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AuthResult =
  | { ok: true; needsEmailConfirmation?: boolean }
  | { ok: false; message: string };

function friendlyError(message: string): string {
  const text = message.toLowerCase();
  if (text.includes("invalid login credentials")) {
    return "That email and password combination doesn't match an account. Please check and try again.";
  }
  if (text.includes("email not confirmed")) {
    return "Please confirm your email address first — check your inbox for the confirmation link.";
  }
  if (text.includes("already registered") || text.includes("already been registered")) {
    return "An account with this email already exists. Try signing in instead.";
  }
  if (text.includes("password should be at least")) {
    return "Your password is too short. Please use at least 6 characters.";
  }
  if (text.includes("rate limit") || text.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }
  if (text.includes("invalid email")) return "Please enter a valid email address.";
  return message || "Something went wrong. Please try again.";
}

export async function signUpWithEmail(input: {
  email: string;
  password: string;
  fullName: string;
}): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
      data: { full_name: input.fullName },
    },
  });
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true, needsEmailConfirmation: !data.session };
}

export async function signInWithEmail(input: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true };
}

export async function signOutUser(): Promise<void> {
  await supabase.auth.signOut();
}

/** Current session for UI purposes (header state, greetings). */
export function useSessionUser(): { user: User | null; loading: boolean } {
  const [state, setState] = useState<{ user: User | null; loading: boolean }>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;
    const apply = (session: Session | null) => {
      if (active) setState({ user: session?.user ?? null, loading: false });
    };

    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => apply(session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
