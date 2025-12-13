"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md shadow-md rounded-md px-4 py-6 ">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 justify-space-between">
            <User className="w-8 h-8 text-gray-500" />
            <div className="flex flex-col">
              <p className="text-lg font-semibold">Name: John Doe</p>
              <p className="text-sm text-gray-500">
                Email: john.doe@example.com
              </p>
              <p className="text-sm text-muted-foreground">
                &ldquo;this is a mock data&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
