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
import { Users, Bus, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AddDrivers() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    driver_id: null,
    name: "",
    license_no: "",
    aadhaar_no: "",
    bus_assigned: "",
    contact: "",
  });

  const [drivers, setDrivers] = useState([
    {
      driver_id: 1,
      name: "Ramesh Kumar",
      license_no: "DL12345678",
      aadhaar_no: "1234-5678-9012",
      bus_assigned: "B101",
      contact: "9876543210",
    },
    {
      driver_id: 2,
      name: "Sanjay Patel",
      license_no: "DL87654321",
      aadhaar_no: "2345-6789-0123",
      bus_assigned: "B202",
      contact: "9123456780",
    },
  ]);

  const totalDrivers = drivers.length;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers(drivers.filter((d) => d.driver_id !== id));
      toast.success("Driver deleted successfully");
    } else {
      toast.error("Deletion cancelled");
    }
  };

  const handleEdit = (driver) => {
    setFormData(driver);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.license_no ||
      !formData.aadhaar_no ||
      !formData.bus_assigned ||
      !formData.contact
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (isEditing) {
      setDrivers(
        drivers.map((d) => (d.driver_id === formData.driver_id ? formData : d))
      );
      toast.success("Driver updated successfully");
    } else {
      setDrivers([...drivers, { ...formData, driver_id: Date.now() }]);
      toast.success("Driver added successfully");
    }

    setOpen(false);
    setFormData({
      driver_id: null,
      name: "",
      license_no: "",
      aadhaar_no: "",
      bus_assigned: "",
      contact: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Drivers Management</h1>
          <p className="text-muted-foreground">
            Manage all drivers and their details
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                setFormData({
                  driver_id: null,
                  name: "",
                  license_no: "",
                  aadhaar_no: "",
                  bus_assigned: "",
                  contact: "",
                });
                setIsEditing(false);
              }}
            >
              Add New Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Driver" : "Add New Driver"}
              </DialogTitle>
            </DialogHeader>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="Enter driver name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>License No</Label>
                <Input
                  placeholder="Enter license number"
                  value={formData.license_no}
                  onChange={(e) =>
                    setFormData({ ...formData, license_no: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Aadhaar No</Label>
                <Input
                  placeholder="XXXX-XXXX-XXXX"
                  value={formData.aadhaar_no}
                  onChange={(e) =>
                    setFormData({ ...formData, aadhaar_no: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Bus Assigned</Label>
                <Select
                  value={formData.bus_assigned}
                  onValueChange={(val) =>
                    setFormData({ ...formData, bus_assigned: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Bus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B101">B101</SelectItem>
                    <SelectItem value="B202">B202</SelectItem>
                    <SelectItem value="B303">B303</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Contact</Label>
                <Input
                  placeholder="Enter contact number"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
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
              <CardTitle>Total Drivers</CardTitle>
              <p className="text-sm opacity-80">All registered drivers</p>
            </div>
            <Users size={28} />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalDrivers}
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Name</TableHead>
                <TableHead>License No</TableHead>
                <TableHead>Aadhaar No</TableHead>
                <TableHead>Bus Assigned</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((d) => (
                <TableRow key={d.driver_id}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.license_no}</TableCell>
                  <TableCell>{d.aadhaar_no}</TableCell>
                  <TableCell>{d.bus_assigned}</TableCell>
                  <TableCell>{d.contact}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(d)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(d.driver_id)}
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
