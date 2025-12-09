"use client";

import { LessonWithProgressProps } from "@/lib/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ContextType = {
  selection: LessonWithProgressProps | null;
  setSelection: Dispatch<SetStateAction<LessonWithProgressProps | null>>;
};

const SelectionSyncContext = createContext<ContextType | undefined>(undefined);

const SelectionSyncProvider = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<LessonWithProgressProps | null>(
    null
  );

  return (
    <SelectionSyncContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionSyncContext.Provider>
  );
};

const useSelectionSync = () => {
  const context = useContext(SelectionSyncContext);
  if (!context) {
    throw new Error("useSelectionSync must be used within its provider");
  }
  return context;
};

export { SelectionSyncProvider, useSelectionSync };
