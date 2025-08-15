import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Custom bus marker with bus number
const createBusIcon = (busNumber) =>
  L.divIcon({
    className: "custom-bus-marker",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          background: #2563eb;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          white-space: nowrap;
        ">
          ${busNumber}
        </div>
        <div style="
          width: 0; 
          height: 0; 
          border-left: 6px solid transparent; 
          border-right: 6px solid transparent; 
          border-top: 8px solid #2563eb;
        "></div>
      </div>
    `,
    iconAnchor: [20, 30],
  });

export default function LiveBusMap() {
  const [buses] = useState([
    {
      id: 1,
      bus_number: "RJ101",
      driver_name: "Ramesh",
      speed: "45 km/h",
      last_updated: "2 mins ago",
      position: [22.3039, 70.8022],
    },
    {
      id: 2,
      bus_number: "RJ202",
      driver_name: "Sanjay",
      speed: "38 km/h",
      last_updated: "5 mins ago",
      position: [22.3100, 70.8025],
    },
    {
      id: 3,
      bus_number: "RJ303",
      driver_name: "Vikram",
      speed: "50 km/h",
      last_updated: "1 min ago",
      position: [22.2854, 70.7781],
    },
  ]);

  const totalBuses = buses.length;
  const activeBuses = buses.filter((b) => parseInt(b.speed) > 0).length;

  return (
    <div className="space-y-6 p-4">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Live Bus Tracking</h1>
        <p className="text-muted-foreground">
          Monitor real-time bus locations, speed, and driver details
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Total Buses</CardTitle>
            <p className="text-sm opacity-80">All registered buses</p>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{totalBuses}</CardContent>
        </Card>
        <Card className="bg-yellow-500 text-white shadow-md">
          <CardHeader>
            <CardTitle>Active Buses</CardTitle>
            <p className="text-sm opacity-80">Currently moving</p>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{activeBuses}</CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <Card>
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <CardTitle>Live Bus Location Map</CardTitle>
        </CardHeader>
        <CardContent>
          <MapContainer
            center={[22.3039, 70.8022]}
            zoom={13}
            style={{ height: "500px", width: "100%", borderRadius: "8px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {buses.map((bus) => (
              <Marker
                key={bus.id}
                position={bus.position}
                icon={createBusIcon(bus.bus_number)}
              >
                <Popup>
                  <strong>Bus:</strong> {bus.bus_number} <br />
                  <strong>Driver:</strong> {bus.driver_name} <br />
                  <strong>Speed:</strong> {bus.speed} <br />
                  <strong>Last Updated:</strong> {bus.last_updated}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      {/* Bus Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Bus Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Bus Number</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Speed</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.bus_number}</TableCell>
                  <TableCell>{bus.driver_name}</TableCell>
                  <TableCell>{bus.speed}</TableCell>
                  <TableCell>{bus.last_updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
