"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    const supabase = createClient();

    async function finishLogin() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        setMessage("Invalid or expired sign-in link.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Magic Link callback error:", error);
        setMessage("Could not complete sign-in. Please request a new Magic Link.");
        return;
      }

      router.replace("/");
      router.refresh();
    }

    finishLogin();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <p>{message}</p>
      </div>
    </main>
  );
}
