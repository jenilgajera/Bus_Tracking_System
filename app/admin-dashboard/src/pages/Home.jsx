import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Home() {
  // Example summary stats
  const stats = {
    totalBuses: 15,
    activeBuses: 12,
    pendingComplaints: 3,
    resolvedComplaints: 18,
  };

  // Example bar chart data (speed by bus)
  const speedData = [
    { name: "RJ101", speed: 45 },
    { name: "RJ202", speed: 38 },
    { name: "RJ303", speed: 50 },
    { name: "RJ404", speed: 42 },
    { name: "RJ505", speed: 35 },
  ];

  // Example pie chart data (active vs inactive buses)
  const pieData = [
    { name: "Active", value: stats.activeBuses },
    { name: "Inactive", value: stats.totalBuses - stats.activeBuses },
  ];
  const COLORS = ["#2563eb", "#fbbf24"];

  // Example recent complaints
  const complaints = [
    { id: 1, name: "Rahul Sharma", bus: "B101", status: "Pending" },
    { id: 2, name: "Amit Kumar", bus: "B202", status: "Resolved" },
    { id: 3, name: "Sneha Verma", bus: "B303", status: "Pending" },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview and analytics of the Bus Tracking System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-blue-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Total Buses</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.totalBuses}</CardContent>
        </Card>

        <Card className="bg-green-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Active Buses</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.activeBuses}</CardContent>
        </Card>

        <Card className="bg-yellow-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Pending Complaints</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.pendingComplaints}</CardContent>
        </Card>

        <Card className="bg-purple-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Resolved Complaints</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{stats.resolvedComplaints}</CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Average Speed by Bus</CardTitle>
          </CardHeader>
          <CardContent style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="speed" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Active vs Inactive Buses</CardTitle>
          </CardHeader>
          <CardContent style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Student/Parent</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.bus}</TableCell>
                  <TableCell
                    className={
                      c.status === "Resolved"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {c.status}
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
