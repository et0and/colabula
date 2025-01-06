"use client";

import { formatDistanceToNow } from "date-fns";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Artwork } from "@prisma/client";
import { getArtworks } from "@/lib/data";

type ArtworkWithUser = Artwork & {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

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
        {
          title: "Sculpture",
          url: "/portal/sculpture",
        },
        {
          title: "Design",
          url: "/portal/design",
        },
        {
          title: "Photography",
          url: "/portal/photography",
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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ArtworkWithUser[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const results = await getArtworks(searchTerm);
      setSearchResults(results);
    };

    const timeoutId = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (artwork: ArtworkWithUser) => {
    setSearchTerm("");
    setSearchResults([]);
    router.push(
      `/portal/${artwork.category.toLowerCase()}/artwork/${artwork.id}`
    );
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between w-full p-2">
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Aratuku</span>
                  <span className="bg-gradient-to-r from-black via-orange-350 to-orange-700 text-white text-xs px-1 rounded">
                    Beta v0.1
                  </span>
                </div>
              </div>
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
                          src={
                            data?.user.image ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={data?.user.name || "@user"}
                        />
                        <AvatarFallback className="bg-orange-900">
                          {data?.user.name?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
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
                    <DropdownMenuItem asChild>
                      <Link href="/portal/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/portal/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/portal/about">
                        <Info className="mr-2 h-4 w-4" />
                        <span>About</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/portal/terms">
                        <ReceiptText className="mr-2 h-4 w-4" />
                        <span>Terms of Service</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/portal/privacy-policy">
                        <Cookie className="mr-2 h-4 w-4" />
                        <span>Privacy Policy</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/portal/open-source">
                        <CodeXml className="mr-2 h-4 w-4" />
                        <span>Open Source</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={async () => {
                        await signOut();
                        toast.success("Logged out!");
                        window.location.href = "/";
                      }}
                    >
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
            <Input
              ref={inputRef} // Attach ref to the input
              placeholder="Search (⌘K)"
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchInputChange}
            />

            {searchResults.length > 0 && searchTerm !== "" && (
              <ul className="absolute top-12 left-0 w-full bg-white rounded-md shadow-md z-10 border">
                {searchResults.map((artwork) => (
                  <li
                    key={artwork.id}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => handleSuggestionClick(artwork)}
                  >
                    <div>
                      <div className="font-semibold">{artwork.title}</div>
                      <div className="text-sm text-muted-foreground">
                        posted by {artwork.user?.name || "Unknown"}{" "}
                        {formatDistanceToNow(artwork.createdAt, {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
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
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <img src="/logo.svg" alt="Aratuku Logo" className="h-28 w-28" />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
