"use client"

import React, { createContext, useState } from "react";

type Props = {
  children: any;
};

export type LayoutContextStore = {
  theme: 1 | 2;
  changeTheme: (v: 1 | 2) => any;
};

const LayoutContext = createContext({} as LayoutContextStore);

const LayoutContextProvider = (props: Props) => {
  // 主题
  const [theme, setTheme] = useState<any>(1);

  return (
    <LayoutContext.Provider
      value={{ theme, changeTheme: (v: 1 | 2) => setTheme(v) }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
};

export { LayoutContextProvider, LayoutContext };
