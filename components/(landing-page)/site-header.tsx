"use client";

import Link from "next/link";
import * as React from "react";
import { siteHeaderContent } from "@/lib/strings";

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

export function SiteHeader() {
  return (
    <header className="sticky top-2 z-50 m-2 rounded-xl border shadow-[0_10px_100px_-15px_rgba(0,0,0,0.1)] backdrop-blur-lg bg-white/30">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" prefetch className="flex items-center space-x-2">
            <span className="hidden sm:inline-flex sm:ml-6 font-bold text-xl hover:text-orange-600 transition-colors duration-800 items-center gap-2">
              {siteHeaderContent.logo.text}
              <span className="bg-orange-600 px-2 rounded-full text-white text-xs">
                {siteHeaderContent.logo.badge}
              </span>
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  {siteHeaderContent.productMenu.trigger}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {siteHeaderContent.productMenu.items.map((item) => (
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
                <NavigationMenuTrigger className="bg-transparent">
                  {siteHeaderContent.schoolsMenu.trigger}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {siteHeaderContent.schoolsMenu.items.map((item) => (
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
                <Link href="/open-source" prefetch legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent`}
                  >
                    {siteHeaderContent.navigation.openSource}
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
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} bg-transparent`}
                  >
                    {siteHeaderContent.navigation.requestDemo}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu className="md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xl font-bold bg-transparent">
                  {siteHeaderContent.logo.text}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    {siteHeaderContent.mobileMenu.items.map((item) => (
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4 mr-4">
          <Button asChild>
            <Link href="/sign-in">{siteHeaderContent.navigation.login}</Link>
          </Button>
          <Button
            asChild
            className="relative overflow-hidden px-6 py-2.5 font-medium text-white bg-gradient-to-b from-orange-500 to-orange-600 shadow-xl transition-all duration-200 ease-in-out hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/25 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 active:scale-[0.98] animate-glow"
          >
            <Link href="sign-up">
              {siteHeaderContent.navigation.signup}
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
>(({ className, title, children, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          prefetch
          href={props.href || ""}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
