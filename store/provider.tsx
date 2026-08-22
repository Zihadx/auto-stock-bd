"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";

export function StoreProvider({ children }: { children: ReactNode }) {
  // Lazy initializer guarantees the store is created exactly once per
  // mount, without touching refs during render (avoids react-hooks/refs).
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
