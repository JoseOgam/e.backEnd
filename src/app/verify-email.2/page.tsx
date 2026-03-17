import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export default function VerifyEmailPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontSize: "24px",
      }}
    >
      <Suspense fallback={<h1>Loading verification...</h1>}>
        <VerifyEmailClient />
      </Suspense>
    </div>
  );
}
