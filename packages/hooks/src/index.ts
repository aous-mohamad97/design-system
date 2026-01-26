/**
 * React hooks package
 */

// Theme hook
export { useTheme, type Theme } from './use-theme';

// Media query hooks
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
} from './use-media-query';

// Click outside hook
export { useClickOutside } from './use-click-outside';

// Debounce hooks
export { useDebounce, useDebouncedCallback } from './use-debounce';

// Throttle hook
export { useThrottledCallback } from './use-throttle';

// Storage hooks
export { useLocalStorage } from './use-local-storage';
export { useSessionStorage } from './use-session-storage';

// Toggle hook
export { useToggle } from './use-toggle';
