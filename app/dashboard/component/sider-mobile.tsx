"use client";

import { SidebarItems } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu, MoreHorizontal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarButtonSheet as SidebarButton } from "./sidebarButton"; // Use the correct import here
import { Separator } from "@radix-ui/react-separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
  onSelectItem: (label: string) => void;
  selectedItem: string;
}

export function SidebarMobile({
  sidebarItems,
  onSelectItem,
}: SidebarMobileProps) {
  const pathname = usePathname(); // Use const to avoid reassignment

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="fixed top-3 left-4">
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        hideClose
        className="p-0 m-0" // Ensure no padding or margin
      >
        <SheetHeader className="flex flex-row justify-between items-center space-y-0 p-0 m-0">
          <span className="text-lg font-semibold text-foreground mx-3">Ai</span>
          <SheetClose>
            <Button className="h-7 w-7 p-0 m-0" variant="ghost">
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
          <div className="mt-5 flex flex-col  gap-1">
            {sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? "secondary" : "ghost"} // Correct comparison using ===
                  icon={link.icon!}
                  className="w-full"
                  onClick={() => onSelectItem(link.label)} // Handle click event
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className="absolute w-full bottom-12 px-1 left-0">
            <Separator className="absolute -top-3 left-0 w-full" />

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://i.pinimg.com/originals/c3/85/1e/c3851e43527296515fdbb913bb33a6f4.jpg" />
                        <AvatarFallback>move</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        move
                      </span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mb-2 p-2 rounded-[1rem]">
                <div className="space-y-1">
                  <Link href="/">
                    <SidebarButton size="sm" icon={LogOut} className="w-full">
                      Log Out
                    </SidebarButton>
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
