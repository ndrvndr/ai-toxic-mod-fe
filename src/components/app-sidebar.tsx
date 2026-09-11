import { useRouteContext } from "@tanstack/react-router"
import {
  AtSign,
  LayoutDashboard,
  Radio,
  RotateCcwClock,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { ModeToggle } from "./mode-toggle"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Rules",
      url: "/dashboard/rules",
      icon: Settings,
    },
    {
      title: "Live",
      url: "/dashboard/live",
      icon: Radio,
    },
    {
      title: "History",
      url: "/dashboard/history",
      icon: RotateCcwClock,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentUser } = useRouteContext({ from: "/_authenticated" })

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              render={
                <a href="#">
                  <AtSign className="size-5!" />
                  <span className="text-base font-semibold">ndrvndr</span>
                </a>
              }
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            />
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
