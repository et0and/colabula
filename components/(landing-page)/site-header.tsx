"use client";

import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";

const productItems = [
  {
    title: "For students",
    href: "/product#students",
    description: "Learn how Aratuku can help students excel",
  },
  {
    title: "For teachers",
    href: "/product#teachers",
    description: "Discover tools to enhance your teaching experience",
  },
  {
    title: "Features",
    href: "/product",
    description: "Explore all the features Aratuku has to offer",
  },
];

const schoolItems = [
  {
    title: "Schools",
    href: "/schools",
    description: "Solutions for secondary art education",
  },
  {
    title: "Case studies",
    href: "/schools#case-studies",
    description: "See how other institutions use Aratuku",
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-2 z-50 m-2 rounded-xl border shadow-[0_10px_100px_-15px_rgba(0,0,0,0.1)] bg-background">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="hidden sm:inline-block sm:ml-6 font-bold text-xl hover:text-orange-600 transition-colors duration-800">
              Aratuku
            </span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {productItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Schools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {schoolItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/open-source" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Open source
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem> */}
              <NavigationMenuItem>
                <Link href="mailto:info@aratuku.com" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Request a demo
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu className="md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xl font-bold">
                  Aratuku
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <ListItem title="Product" href="/product">
                      All our product offerings and features
                    </ListItem>
                    <ListItem title="Schools" href="/schools">
                      Educational institutions using Aratuku
                    </ListItem>
                    <ListItem title="Open Source" href="/open-source">
                      Our commitment to open source
                    </ListItem>
                    <ListItem title="Pricing" href="/pricing">
                      Plans and pricing options
                    </ListItem>
                    <ListItem title="Request a Demo" href="/demo">
                      See Aratuku in action
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4 mr-4">
          <Button asChild>
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button
            asChild
            className="relative overflow-hidden px-6 py-2.5 font-medium text-white bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl transition-all duration-200 ease-in-out hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 active:scale-[0.98] animate-glow"
          >
            <Link href="sign-up">
              Sign up
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
