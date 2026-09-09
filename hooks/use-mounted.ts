import { useSyncExternalStore } from "react";

/**
 * True once the component has mounted on the client, false during SSR and
 * the first client render. Use this to gate any read of `next-themes`'s
 * `resolvedTheme` — it's `undefined` until next-themes mounts and reads
 * localStorage/the `.dark` class, so reading it unguarded causes an
 * intermittent "stuck on the wrong theme" bug: the component can render
 * once during the exact window where resolvedTheme is stale/undefined and
 * never gets a forced second render once it settles.
 *
 * Usage:
 *   const mounted = useMounted();
 *   const { resolvedTheme } = useTheme();
 *   const isLight = mounted && resolvedTheme === "light";
 *   //              ^ before mount: always false (dark), matching
 *   //                defaultTheme="dark" in ThemeProvider and avoiding a
 *   //                hydration flash. After mount: the real theme.
 */
const subscribe = () => () => {};

export const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );