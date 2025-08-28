import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 grid gap-6">
      <h2 className="text-2xl font-bold">⚙️ Settings</h2>
      <p className="text-muted-foreground text-base mb-2">
        Manage your admin profile, password, and preferences.
      </p>

      {/* Profile Settings */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Update your admin name and email address.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Admin Name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input placeholder="admin@example.com" type="email" />
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Set a new password for your admin account.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label>Current Password</Label>
            <Input type="password" />
          </div>
          <div>
            <Label>New Password</Label>
            <Input type="password" />
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input type="password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
