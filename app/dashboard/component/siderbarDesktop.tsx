"use client";

import React from "react";
import SidebarButton from "./sidebarButton";
import { SidebarItems } from "@/app/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";
import SignOutButton from "@/app/(auth)/component/signOutButton";

interface SidebarDesktopProps {
  onSelectItem(label: string): void;
  sidebarItems: SidebarItems;
  selectedItem: string;
  userEmail?: string; // Make userEmail optional
}

const getInitials = (email: string) => {
  if (!email || !email.includes("@")) return ""; // Handle invalid email

  const localPart = email.split("@")[0];
  const [firstName, lastName] = localPart.split(" ");

  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
};

const SidebarDesktop = ({
  sidebarItems,
  onSelectItem,
  selectedItem,
  userEmail = "",
}: SidebarDesktopProps) => {
  const pathname = usePathname();
  const initials = getInitials(userEmail);

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r border-gray-200">
      <div className="h-full px-4 py-6 flex flex-col">
        <h3 className="text-lg font-semibold text-foreground">AI</h3>
        <div className="mt-5 flex flex-col gap-2">
          {sidebarItems.links.map((link, index) =>
            link.icon ? (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? "link" : "ghost"}
                  icon={link.icon}
                  className="w-full"
                  onClick={() => onSelectItem(link.label)}
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ) : null
          )}
          {sidebarItems.extras}
        </div>
        <div className="mt-auto px-1">
          <Separator className="mb-2" />
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex justify-between items-center w-full cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gray-400 text-white flex items-center justify-center rounded-full text-sm font-medium">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {initials}
                  </span>
                </div>
                <MoreHorizontal size={20} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-3 rounded-lg w-56">
              <div className="space-y-1">
                <SignOutButton />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  );
};
export default SidebarDesktop;
