// src/components/app-sidebar.jsx
import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  Bus,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={[
            { name: "Acme Inc", logo: GalleryVerticalEnd, plan: "Enterprise" },
            { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
            { name: "Evil Corp.", logo: Command, plan: "Free" },
          ]}
        />
      </SidebarHeader>

      <SidebarContent>
        <nav className="space-y-2 px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <SquareTerminal size={18} className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/addstudents"
            className={({ isActive }) =>
              `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <Users size={18} className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Students
            </span>
          </NavLink>

          <NavLink
            to="/addbuses"
            className={({ isActive }) =>
              `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <Bus size={18} className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">Buses</span>
          </NavLink>
          <NavLink
            to="/adddrivers"
            className={({ isActive }) =>
              `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <Bus size={18} className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              AddDrivers
            </span>
          </NavLink>

          <NavLink
            to="/complaintmanagement"
            className={({ isActive }) =>
              `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <BookOpen size={18} className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Complaint Management
            </span>
          </NavLink>

          <NavLink
            to="/livebusmap"
            className={({ isActive }) =>
              `group flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <Map size={18} className="shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">
              Live Bus Map
            </span>
          </NavLink>
        </nav>

        <NavProjects
          projects={[
            { name: "Design Engineering", url: "#", icon: Frame },
            { name: "Sales & Marketing", url: "#", icon: PieChart },
            { name: "Travel", url: "#", icon: Map },
          ]}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
