"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) return;

    axios
      .post("/api/users/verify-email", { token })
      .then(() => setStatus("Email verified successfully 🎉"))
      .catch(() => setStatus("Verification failed ❌"));
  }, [token]);

  return <h1>{status}</h1>;
}
