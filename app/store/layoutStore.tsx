"use client";

import React, { createContext, useState } from "react";

type Props = {
  children: any;
};

export type LayoutContextStore = {
  theme: 1 | 2;
  changeTheme: (v: 1 | 2) => void;
  routerType: "all" | "traces";
  changeRouterType: (v: "all" | "traces") => void;
};

const LayoutContext = createContext({} as LayoutContextStore);

const LayoutContextProvider = (props: Props) => {
  // 主题
  const [theme, setTheme] = useState<any>(1);
  // 可见导航
  const [routerType, setRouterType] = useState<"all" | "traces">("all");

  return (
    <LayoutContext.Provider
      value={{
        theme,
        changeTheme: (v: 1 | 2) => setTheme(v),
        routerType,
        changeRouterType: (v: "all" | "traces") => setRouterType(v),
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};

export { LayoutContextProvider, LayoutContext };
