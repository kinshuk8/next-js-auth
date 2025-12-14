"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { get } from "mongoose";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logged out successfully ✅");
      console.log("Logout response:", response.data);
      router.push("/login");
    } catch (error: any) {
      console.error("Error while logging out:", error.message);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      console.log("User Data: ", response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      setLoading(false);
      console.error("Error while fetching user data: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md shadow-md rounded-md px-4 py-6 ">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            {data === "nothing" ? "Nothing Found" : data}
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className="text-sm text-muted-foreground hover:text-blue-700"
            >
              <Link href={`/profile/${data}`}>View Profile</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 justify-space-between px-4 py-2">
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
        <CardFooter className="flex justfiy-between ">
          <CardAction>
            <div>
              <Button
                variant="outline"
                className="text-white rounded-md bg-green-600 hover:bg-green-700 px-4 py-2 hover:text-white"
                onClick={() => getUserData()}
              >
                Get User Details
              </Button>
              <Button
                variant="outline"
                className="rounded-md text-white bg-red-500 shadow-md hover:bg-red-600 hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
