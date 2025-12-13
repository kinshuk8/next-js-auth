"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Please enter your email address to receive a verification code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => {
              // TODO: Implement OTP generation and email sending logic
              router.push("/verify-otp");
            }}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
