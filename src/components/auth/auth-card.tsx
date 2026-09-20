import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmail, signUpWithEmail } from "@/lib/auth";

type Mode = "login" | "signup";
type Errors = Partial<Record<"fullName" | "email" | "password", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function AuthCard({ mode }: { mode: Mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const data = new FormData(event.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const next: Errors = {};
    if (isSignup && fullName.length < 2) next.fullName = "Please enter your full name.";
    if (!email) next.email = "Email address is required.";
    else if (!emailPattern.test(email)) next.email = "Please enter a valid email address.";
    if (!password) next.password = "Password is required.";
    else if (isSignup && password.length < 6) next.password = "Use at least 6 characters.";

    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    const result = isSignup
      ? await signUpWithEmail({ email, password, fullName })
      : await signInWithEmail({ email, password });
    setLoading(false);

    if (!result.ok) {
      setFormError(result.message);
      return;
    }
    if (isSignup && result.needsEmailConfirmation) {
      setConfirmSent(true);
      return;
    }
    navigate({ to: "/dashboard", replace: true });
  }

  if (confirmSent) {
    return (
      <div className="rounded-lg border border-border bg-card p-8">
        <h2 className="font-display text-xl font-semibold">Confirm your email</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          We've sent a confirmation link to your email address. Open it to activate your account,
          then sign in.
        </p>
        <Button asChild className="mt-6">
          <Link to="/login">Go to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5">
        {isSignup && (
          <Field id="fullName" label="Full name" error={errors.fullName}>
            <Input id="fullName" name="fullName" autoComplete="name" placeholder="Your name"
              aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
          </Field>
        )}
        <Field id="email" label="Email address" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
        <Field id="password" label="Password" error={errors.password}>
          <Input id="password" name="password" type="password"
            autoComplete={isSignup ? "new-password" : "current-password"} placeholder="••••••••"
            aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} />
        </Field>

        {formError && (
          <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {formError}
          </p>
        )}

        <Button type="submit" size="lg" disabled={loading}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Please wait…" : isSignup ? "Create account" : "Sign in"}
        </Button>

        <p className="text-sm text-muted-foreground">
          {isSignup ? "Already have an account? " : "New to Veldepu AI? "}
          <Link to={isSignup ? "/login" : "/signup"} className="font-semibold text-primary hover:underline">
            {isSignup ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error: string | undefined; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
