"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center mb-6">
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            Verify OTP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription className="text-center text-gray-600 dark:text-gray-300 text-base">
            Please enter the 6-digit verification code sent to your email or
            phone number.
          </CardDescription>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter className="mt-6 flex flex-col items-center">
          <Button
            // TODO: Implement OTP VERIFY LOGIC
            onClick={() => router.push("/login")}
            className="max-w-sm bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out shadow-md"
          >
            Verify
          </Button>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
            Didn&apos;t receive the code?{" "}
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              Resend
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
