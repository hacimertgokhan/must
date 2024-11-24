import {Calendar, Home, Inbox, Search, Settings, XIcon} from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from "react";

// Menu items.
const items = [
    {
        url: "/",
        icon: Home,
    },
    {
        url: "logs",
        icon: Search,
    },
    {
        url: "settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar className={"w-[64px] flex items-center justify-center"}>
            <SidebarHeader className={"w-full flex items-center justify-center"}><img src={"./icon.png"} width={32} height={32} alt="Must Logo"/></SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupContent>
                        <SidebarMenu className={"w-full flex items-center justify-center"}>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={"w-full flex items-center justify-center h-[60px]"}>
                <a className={"cursor-pointer hover:rotate-90 transition-all"}><XIcon size={20}/></a>

            </SidebarFooter>
        </Sidebar>
    )
}
