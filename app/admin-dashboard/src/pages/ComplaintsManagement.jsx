import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      bus_number: "B101",
      description: "Bus was late by 20 minutes.",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      bus_number: "B202",
      description: "Driver was speeding in a residential area.",
      status: "Resolved",
    },
  ]);

  const markResolved = (id) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "Resolved" } : c
      )
    );
    toast.success("Complaint marked as resolved");
  };

  const totalComplaints = complaints.length;
  const pendingComplaints = complaints.filter(c => c.status === "Pending").length;

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Complaints Management</h1>
        <p className="text-muted-foreground">
          Monitor, track, and resolve complaints from students and parents
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Total Complaints</CardTitle>
            <p className="text-sm opacity-80">All submitted complaints</p>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalComplaints}</CardContent>
        </Card>
        <Card className="bg-yellow-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Pending Complaints</CardTitle>
            <p className="text-sm opacity-80">Needs resolution</p>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{pendingComplaints}</CardContent>
        </Card>
      </div>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Complaints List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Student/Parent</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.bus_number}</TableCell>
                  <TableCell>{c.description}</TableCell>
                  <TableCell
                    className={
                      c.status === "Resolved"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {c.status}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    {c.status !== "Resolved" && (
                      <Button
                        variant="outline"
                        onClick={() => markResolved(c.id)}
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button variant="secondary">
                      Reply
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
