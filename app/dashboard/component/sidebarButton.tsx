import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { LucideIcon } from "lucide-react"; // Importing LucideIcon
import { cn } from "@/lib/utils"; // Assuming cn is a utility function for conditionally joining class names
import { SheetClose } from "@/components/ui/sheet";

interface SidebarButtonProps extends ButtonProps {
  icon: LucideIcon;
}

const SidebarButton = ({
  icon: Icon,
  className,
  children,
  ...props
}: SidebarButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("gap-2 justify-start ", className)} // Make button full width
      {...props}
    >
      {Icon && <Icon size={24} />}{" "}
      {/* Optional: Set a specific size for the icon */}
      <span>{children}</span>
    </Button>
  );
};

export default SidebarButton;

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose>
      <SidebarButton {...props} />
    </SheetClose>
  );
}
