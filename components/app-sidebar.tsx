"use client";

import { useSession } from "@/lib/auth-client";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDropbox,
  faGoogleDrive,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import {
  CodeXml,
  Cookie,
  Info,
  LogOut,
  ReceiptText,
  Search,
  Settings,
  Upload,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { UploadForm } from "./upload-form";
import Link from "next/link";

// This is sample data.
const nav = {
  navMain: [
    {
      title: "Browse",
      url: "#",
      items: [
        {
          title: "Painting",
          url: "/portal/painting",
          isActive: true,
        },
        /* {
          title: "Sculpture",
          url: "#",
          disabled: true,
        },
        {
          title: "Design",
          url: "#",
        },
        {
          title: "Photography",
          url: "#",
        }, */
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Recently added",
          url: "#",
        },
        {
          title: "Top rated",
          url: "#",
        },
        {
          title: "Recent discussion",
          url: "#",
        },
        {
          title: "Achievement standards",
          url: "https://www.nzqa.govt.nz/ncea/assessment/search.do?query=visual+arts&view=all&level=all",
        },
        {
          title: "Contribution guide",
          url: "/portal/contributing",
        },
        {
          title: "Participating schools",
          url: "/portal/participating-schools",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useSession();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full">
              <SidebarMenuButton isActive={false} size="lg" asChild>
                <div className="flex items-center gap-2">
                  <img
                    src="/tabula-logo.svg"
                    alt="Tabula Logo"
                    className="h-28 w-28"
                  />
                  {/* <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Tabula</span>
                    <span className="bg-gradient-to-r from-blue-400 via-blue-350 to-blue-700 text-white text-xs px-1 rounded">
                      Alpha v0.0.1
                    </span>
                  </div> */}
                </div>
              </SidebarMenuButton>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                      <span className="sr-only">Upload</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Upload image</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="p-0"
                      onSelect={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <UploadForm />
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <FontAwesomeIcon icon={faGoogleDrive} className="ml-2" />{" "}
                      <span>From Google Drive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <FontAwesomeIcon icon={faMicrosoft} className="ml-2" />
                      <span>From Microsoft OneDrive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <FontAwesomeIcon icon={faDropbox} className="ml-2" />
                      <span>From Dropbox</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="@user"
                        />
                        <AvatarFallback className="bg-orange-900" />
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {data?.user.name || "Guest"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {data?.user.email || "Not signed in"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Info className="mr-2 h-4 w-4" />
                      <span>About</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ReceiptText className="mr-2 h-4 w-4" />
                      <span>Terms of Service</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Cookie className="mr-2 h-4 w-4" />
                      <Link href="/portal/privacy-policy">Privacy Policy</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CodeXml className="mr-2 h-4 w-4" />
                      <span>Open Source</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {nav.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span className="font-bold">{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
