import * as React from "react";
import { User2, Globe, Car, UploadCloud } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Discover",
      url: "#",
      icon: Globe,
      isActive: false,
    },
    {
      title: "Upload",
      url: "/home/upload",
      icon: UploadCloud,
    },
    {
      title: "Your Car list",
      url: "/home/product",
      icon: Car,
    },
    {
      title: "Profile",
      url: "#",
      icon: User2,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
