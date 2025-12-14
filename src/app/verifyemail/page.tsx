"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            Please check your email for a verification link.
          </CardDescription>
        </CardHeader>
        <CardContent className="object-contain">
          {verified && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">Email Verified! 🎉</h1>
              <p className="text-sm text-gray-500">You can now log in.</p>
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">Verification Failed!</h1>
              <p className="text-sm text-gray-500">Please try again.</p>
              <Link href="/login" className="text-blue-500 hover:underline">
                Log In
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
