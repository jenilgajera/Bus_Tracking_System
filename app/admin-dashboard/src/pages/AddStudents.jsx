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
import { Users, UserCheck, UserPlus, Edit, Trash2 } from "lucide-react";

// React Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStudents() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_id: null,
    name: "",
    roll: "",
    parent_name: "",
    parent_phone: "",
    bus_no: "",
    return_bus_no: "",
    phone: "",
    stop: "",
    status: "",
    validity: "",
  });

  const [students, setStudents] = useState([
    {
      user_id: 1,
      name: "Rajesh Kumar",
      roll: "STU001",
      parent_id: 101,
      bus_no: "B1",
      return_bus_no: "B2",
      phone: "9876543210",
      stop: "Stop A",
      status: "Active",
      validity: "2025-12-31",
      isExpired: false,
      parent_name: "Raj",
      parent_phone: "9876543210",
    },
    {
      user_id: 2,
      name: "Anita Sharma",
      roll: "STU002",
      parent_id: 102,
      bus_no: "B3",
      return_bus_no: "B4",
      phone: "9123456780",
      stop: "Stop B",
      status: "Inactive",
      validity: "2025-06-15",
      isExpired: true,
      parent_name: "Suresh",
      parent_phone: "9123456780",
    },
  ]);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === "Active").length;
  const totalParents = new Set(students.map((s) => s.parent_id)).size;

  const resetForm = () => {
    setFormData({
      user_id: null,
      name: "",
      roll: "",
      parent_name: "",
      parent_phone: "",
      bus_no: "",
      return_bus_no: "",
      phone: "",
      stop: "",
      status: "",
      validity: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter((s) => s.user_id !== id));
      toast.success("Student deleted successfully!");
    } else {

      toast.error("Failed to delete student.");
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.roll || !formData.status) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      setStudents(
        students.map((s) => (s.user_id === formData.user_id ? formData : s))
      );
      toast.success("Student updated successfully!");
    } else {
      setStudents([
        ...students,
        { ...formData, user_id: Date.now(), isExpired: false },
      ]);
      toast.success("Student added successfully!");
    }

    setOpen(false);
    resetForm();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">
            Manage students, parents, and transportation details
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                resetForm();
                setIsEditing(false);
              }}
            >
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Student" : "Add New Student"}
              </DialogTitle>
            </DialogHeader>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Enroll / Roll No</Label>
                <Input
                  value={formData.roll}
                  onChange={(e) =>
                    setFormData({ ...formData, roll: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Parent Name</Label>
                <Input
                  value={formData.parent_name}
                  onChange={(e) =>
                    setFormData({ ...formData, parent_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Parent Phone</Label>
                <Input
                  type="tel"
                  value={formData.parent_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, parent_phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Bus No</Label>
                <Input
                  value={formData.bus_no}
                  onChange={(e) =>
                    setFormData({ ...formData, bus_no: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Return Bus No</Label>
                <Input
                  value={formData.return_bus_no}
                  onChange={(e) =>
                    setFormData({ ...formData, return_bus_no: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone No</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Bus Stop</Label>
                <Input
                  value={formData.stop}
                  onChange={(e) =>
                    setFormData({ ...formData, stop: e.target.value })
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
                <Label>Validity</Label>
                <Input
                  type="date"
                  value={formData.validity}
                  onChange={(e) =>
                    setFormData({ ...formData, validity: e.target.value })
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-500 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Total Students</CardTitle>
              <p className="text-sm opacity-80">All registered students</p>
            </div>
            <Users size={28} />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalStudents}
          </CardContent>
        </Card>
        <Card className="bg-green-500 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Students</CardTitle>
              <p className="text-sm opacity-80">Currently active students</p>
            </div>
            <UserCheck size={28} />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {activeStudents}
          </CardContent>
        </Card>
        <Card className="bg-purple-500 text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Total Parents</CardTitle>
              <p className="text-sm opacity-80">Linked parent accounts</p>
            </div>
            <UserPlus size={28} />
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {totalParents}
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      {/* Students Table */}
      <Card>
        <CardContent className="p-4">
          <Table className="border border-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="py-3 px-4">Name</TableHead>
                <TableHead className="py-3 px-4">Roll No</TableHead>
                <TableHead className="py-3 px-4">Parent Name</TableHead>
                <TableHead className="py-3 px-4">Parent Phone</TableHead>
                <TableHead className="py-3 px-4">Bus No</TableHead>
                <TableHead className="py-3 px-4">Return Bus No</TableHead>
                <TableHead className="py-3 px-4">Phone No</TableHead>
                <TableHead className="py-3 px-4">Bus Stop</TableHead>
                <TableHead className="py-3 px-4">Status</TableHead>
                <TableHead className="py-3 px-4">Validity</TableHead>
                <TableHead className="py-3 px-4">Expired</TableHead>
                <TableHead className="py-3 px-4 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((s) => (
                <TableRow key={s.user_id} className="border-t border-gray-200">
                  <TableCell className="py-3 px-4">{s.name}</TableCell>
                  <TableCell className="py-3 px-4">{s.roll}</TableCell>
                  <TableCell className="py-3 px-4">{s.parent_name}</TableCell>
                  <TableCell className="py-3 px-4">{s.parent_phone}</TableCell>
                  <TableCell className="py-3 px-4">{s.bus_no}</TableCell>
                  <TableCell className="py-3 px-4">{s.return_bus_no}</TableCell>
                  <TableCell className="py-3 px-4">{s.phone}</TableCell>
                  <TableCell className="py-3 px-4">{s.stop}</TableCell>
                  <TableCell
                    className={`py-3 px-4 font-semibold ${s.status === "Active" ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {s.status}
                  </TableCell>
                  <TableCell className="py-3 px-4">{s.validity}</TableCell>
                  <TableCell className="py-3 px-4">
                    {s.isExpired ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="py-3 px-4 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(s)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(s.user_id)}
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
