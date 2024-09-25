"use client";

import { Book, Home, Mail, MoreHorizontal } from "lucide-react";
import SidebarButton from "./sidebarButton";
import SidebarDesktop from "./siderbarDesktop";
import { SidebarItems } from "@/app/types";
import { useEffect, useState } from "react";
import HomeContent from "./HomeContent";
import MessagesContent from "./MessagesContent";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sider-mobile";
import CourseList from "./courses/CoursesList";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import CourseDetails from "./courses/CourseDetails";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "", icon: Home },
    { label: "Courses", href: "", icon: Book },
    { label: "Messages", href: "", icon: Mail },
  ],
  extras: (
    <div>
      <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
    </div>
  ),
};

export const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("Home");
  const selectedCourseId = useSelector(
    (state: RootState) => state.course.selectedCourseId
  );

  useEffect(() => {
    const savedItem = localStorage.getItem("selectedSidebarItem");
    if (savedItem) {
      setSelectedItem(savedItem);
    }
  }, []);

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    localStorage.setItem("selectedSidebarItem", item); // Save to local storage
  };

  const renderContent = () => {
    switch (selectedItem) {
      case "Home":
        return <HomeContent />;
      case "Courses":
        return selectedCourseId ? <CourseDetails /> : <CourseList />;
      case "Messages":
        return <MessagesContent />;
      default:
        return <HomeContent />;
    }
  };

  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  return (
    <div className="flex h-screen">
      {isDesktop ? (
        <>
          {/* Sidebar */}
          <SidebarDesktop
            sidebarItems={sidebarItems}
            onSelectItem={handleSelectItem}
            selectedItem={selectedItem} // Pass selectedItem
          />
          {/* Content Area */}
          <div className="w-full overflow-y-auto">{renderContent()}</div>
        </>
      ) : (
        <>
          <SidebarMobile
            sidebarItems={sidebarItems}
            onSelectItem={handleSelectItem}
            selectedItem={selectedItem} // Pass selectedItem
          />
          {/* Content Area */}
          <div className="flex-grow">{renderContent()}</div>
        </>
      )}
    </div>
  );
};
