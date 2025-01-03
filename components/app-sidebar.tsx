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
  Paperclip,
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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Browse",
      url: "#",
      items: [
        {
          title: "Painting",
          url: "#",
          isActive: true,
        },
        {
          title: "Sculpture",
          url: "#",
        },
        {
          title: "Design",
          url: "#",
        },
        {
          title: "Photography",
          url: "#",
        },
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
          url: "#",
        },
        {
          title: "Contribution guide",
          url: "#",
        },
        {
          title: "Participating schools",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full">
              <SidebarMenuButton isActive={false} size="lg" asChild>
                <div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Tabula</span>
                    <span className="bg-gradient-to-r from-blue-400 via-blue-350 to-blue-700 text-white text-xs px-1 rounded">
                      Alpha v0.0.1
                    </span>
                  </div>
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
                    <DropdownMenuLabel>Upload Image</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Paperclip className="h-4 w-4" />
                      <span>From computer</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FontAwesomeIcon icon={faGoogleDrive} />{" "}
                      <span>From Google Drive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FontAwesomeIcon icon={faMicrosoft} />
                      <span>From Microsoft OneDrive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FontAwesomeIcon icon={faDropbox} />
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
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          user@example.com
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
                      <span>Privacy Policy</span>
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
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span className="font-bold">{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
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
