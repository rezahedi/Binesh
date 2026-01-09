"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleThemeSwitch } from "@/utils/theme";

const ThemeSwitchButton = () => {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleThemeSwitch}
      title="Toggle Theme"
      aria-label="Toggle Theme"
      className="shadow-none translate-y-0 active:translate-y-0 text-foreground/70"
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </Button>
  );
};

export default ThemeSwitchButton;
