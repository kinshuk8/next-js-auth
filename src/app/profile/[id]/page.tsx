import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-full max-w-md shadow-md rounded-md px-4 py-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">Profile Page</p>
          <div className="font-medium">
            User ID: <span className="font-bold">{id}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
