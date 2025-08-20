import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReportsAnalytics = () => {
  // Sample data
  const studentsData = [
    { name: "Active", value: 420 },
    { name: "Inactive", value: 80 },
  ];

  const busUsage = [
    { name: "Bus 1", rides: 120 },
    { name: "Bus 2", rides: 95 },
    { name: "Bus 3", rides: 80 },
    { name: "Bus 4", rides: 60 },
  ];

  const complaints = [
    { name: "Resolved", value: 65 },
    { name: "Pending", value: 35 },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FF9800"];

  return (
    <div className="p-6 grid gap-6">
      <h2 className="text-2xl font-bold">📊 Reports & Analytics</h2>

      {/* Student Status (Donut) */}
      <Card>
        <CardHeader>
          <CardTitle>Students Status</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={studentsData}
                dataKey="value"
                innerRadius={60}   // <-- makes it hollow
                outerRadius={100}
                paddingAngle={5}
                label
              >
                {studentsData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bus Usage (Bar Chart) */}
      <Card>
        <CardHeader>
          <CardTitle>Bus Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <BarChart data={busUsage}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rides" fill="#2196F3" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Complaint Resolution (Donut) */}
      <Card>
        <CardHeader>
          <CardTitle>Complaint Resolution Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={complaints}
                dataKey="value"
                innerRadius={60}   // <-- makes it hollow
                outerRadius={100}
                paddingAngle={5}
                label
              >
                {complaints.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
