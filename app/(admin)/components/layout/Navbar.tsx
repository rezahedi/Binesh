import { PanelLeft } from "lucide-react";
import ToggleSidebarBtn from "@admin/components/layout/ToggleSidebarBtn";
import Links from "./Links";

export default function Navbar() {
  return (
    <aside className="w-14 lg:w-20 lg:group-[.isOpen]:w-56 border-r bg-background hidden md:block transition-all duration-200">
      <div className="fixed w-14 lg:w-20 lg:group-[.isOpen]:w-56 inset-y-0 left-0 z-10 flex flex-col py-5 px-2 lg:px-5 transition-all duration-200 overflow-hidden">
        <nav className="flex flex-col flex-1 gap-4">
          <Links />
          <ToggleSidebarBtn className="hidden lg:flex gap-2 size-9 md:w-full items-center p-2 rounded-lg transition-colors hover:bg-muted cursor-pointer">
            <PanelLeft className="size-5 min-w-5" />
            <span className="hidden lg:group-[.isOpen]:block text-nowrap">
              Toggle Menu
            </span>
          </ToggleSidebarBtn>
        </nav>
      </div>
    </aside>
  );
}
