"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailClient() {
  const params = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/users/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) throw new Error();

        setStatus("Email verified successfully 🎉");
      } catch {
        setStatus("Verification failed ❌");
      }
    };

    verifyEmail();
  }, [token]);

  return <h1>{status}</h1>;
}
