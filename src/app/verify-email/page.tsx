// "use client";
// export const dynamic = "force-dynamic";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";

// export default function VerifyEmailPage() {
//   const params = useSearchParams();
//   const token = params.get("token");
//   const [status, setStatus] = useState("Verifying...");

//   useEffect(() => {
//     if (!token) return;

//     axios
//       .post("/api/users/verify-email", { token })
//       .then(() => setStatus("Email verified successfully 🎉"))
//       .catch(() => setStatus("Verification failed ❌"));
//   }, [token]);

//   return <h1>{status}</h1>;
// }
"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("Invalid verification link ❌");
      return;
    }

    const verify = async () => {
      try {
        await axios.post("/api/users/verify-email", { token });
        setStatus("Email verified successfully 🎉");
      } catch (error) {
        setStatus("Verification failed ❌");
      }
    };

    verify();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>{status}</h1>
    </div>
  );
}
