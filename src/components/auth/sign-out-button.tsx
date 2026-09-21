import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/auth";

export function SignOutButton({ variant = "outline" }: { variant?: "outline" | "ghost" }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  async function handleSignOut() {
    if (busy) return;
    setBusy(true);
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOutUser();
    navigate({ to: "/login", replace: true });
  }

  return (
    <Button variant={variant} onClick={handleSignOut} disabled={busy}>
      <LogOut />
      {busy ? "Signing out…" : "Sign out"}
    </Button>
  );
}
