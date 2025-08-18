import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bus, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function BusesManagement() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bus_id: null,
    bus_number: "",
    driver_name: "",
    driver_email: "",
    driver_password: "",
    route: "",
    qr_code: "",
    status: "",
    location: "",
  });

  const [buses, setBuses] = useState([
    {
      bus_id: 1,
      bus_number: "B101",
      driver_name: "Ramesh",
      driver_email: "bus101@school.com",
      route: "Route A",
      qr_code: "QR101.png",
      status: "Active",
      location: "Near Main Gate",
    },
    {
      bus_id: 2,
      bus_number: "B202",
      driver_name: "Sanjay",
      driver_email: "bus202@school.com",
      route: "Route B",
      qr_code: "QR202.png",
      status: "Inactive",
      location: "Garage",
    },
    {
      bus_id: 3,
      bus_number: "B303",
      driver_name: "Amit",
      driver_email: "bus303@school.com",
      route: "Route C",
      qr_code: "QR303.png",
      status: "Active",
      location: "On Route",
    },
  ]);

  const totalBuses = buses.length;
  const activeBuses = buses.filter((b) => b.status === "Active").length;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      setBuses(buses.filter((b) => b.bus_id !== id));
      toast.success("Bus deleted successfully");
    }
    else{
        toast.error("Deletion cancelled");
    }
  };

  const handleEdit = (bus) => {
    setFormData(bus);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSave = () => {
    if (
      !formData.bus_number ||
      !formData.driver_name ||
      !formData.driver_email ||
      !formData.route
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (isEditing) {
      setBuses(buses.map((b) => (b.bus_id === formData.bus_id ? formData : b)));
      toast.success("Bus updated successfully");
    } else {
      setBuses([
        ...buses,
        { ...formData, bus_id: Date.now(), qr_code: "QRNEW.png" },
      ]);
      toast.success("Bus added successfully");
    }

    setOpen(false);
    setFormData({
      bus_id: null,
      bus_number: "",
      driver_name: "",
      driver_email: "",
      driver_password: "",
      route: "",
      qr_code: "",
      status: "",
      location: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Buses Management</h1>
          <p className="text-muted-foreground">
            Manage all buses and their details
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setFormData({
                  bus_id: null,
                  bus_number: "",
                  driver_name: "",
                  driver_email: "",
                  driver_password: "",
                  route: "",
                  qr_code: "",
                  status: "",
                  location: "",
                });
                setIsEditing(false);
              }}
            >
              Add New Bus
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Bus" : "Add New Bus"}
              </DialogTitle>
            </DialogHeader>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Bus Number</Label>
                <Input
                  value={formData.bus_number}
                  onChange={(e) =>
                    setFormData({ ...formData, bus_number: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Driver Name</Label>
                <Input
                  value={formData.driver_name}
                  onChange={(e) =>
                    setFormData({ ...formData, driver_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Driver Email</Label>
                <Input
                  type="email"
                  value={formData.driver_email}
                  onChange={(e) =>
                    setFormData({ ...formData, driver_email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Driver Password</Label>
                <Input
                  type="password"
                  value={formData.driver_password}
                  onChange={(e) =>
                    setFormData({ ...formData, driver_password: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Route</Label>
                <Input
                  value={formData.route}
                  onChange={(e) =>
                    setFormData({ ...formData, route: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val) =>
                    setFormData({ ...formData, status: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Current Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </form>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isEditing ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-500 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Total Buses</CardTitle>
              <p className="text-sm opacity-80">All registered buses</p>
            </div>
            <Bus size={28} />
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalBuses}</CardContent>
        </Card>
        <Card className="bg-green-500 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Buses</CardTitle>
              <p className="text-sm opacity-80">Currently active buses</p>
            </div>
            <MapPin size={28} />
          </CardHeader>
          <CardContent className="text-3xl font-bold">{activeBuses}</CardContent>
        </Card>
      </div>

      {/* Buses Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Bus Number</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Driver Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((b) => (
                <TableRow key={b.bus_id}>
                  <TableCell>{b.bus_number}</TableCell>
                  <TableCell>{b.route}</TableCell>
                  <TableCell>{b.driver_name}</TableCell>
                  <TableCell>{b.driver_email}</TableCell>
                  <TableCell
                    className={
                      b.status === "Active"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {b.status}
                  </TableCell>
                  <TableCell>{b.location}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(b)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(b.bus_id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
