# @design-system/hooks

Custom React hooks for the design system.

## Installation

```bash
pnpm add @design-system/hooks
```

## Usage

### useTheme

Manage light/dark theme:

```tsx
import { useTheme } from '@design-system/hooks';

function App() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current theme: {resolvedTheme}
    </button>
  );
}
```

### useMediaQuery

Match media queries:

```tsx
import { useMediaQuery, useIsMobile } from '@design-system/hooks';

function Component() {
  const isMobile = useIsMobile();
  const isLarge = useMediaQuery('(min-width: 1024px)');
  
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

### useClickOutside

Detect clicks outside element:

```tsx
import { useClickOutside } from '@design-system/hooks';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
  
  return <div ref={ref}>...</div>;
}
```

### useDebounce

Debounce values:

```tsx
import { useDebounce } from '@design-system/hooks';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  
  useEffect(() => {
    // Search with debouncedQuery
  }, [debouncedQuery]);
}
```

### useLocalStorage / useSessionStorage

Persist state:

```tsx
import { useLocalStorage } from '@design-system/hooks';

function App() {
  const [value, setValue, removeValue] = useLocalStorage('key', 'default');
  
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### useToggle

Toggle boolean state:

```tsx
import { useToggle } from '@design-system/hooks';

function Component() {
  const [isOpen, toggle, setToggle] = useToggle(false);
  
  return <button onClick={toggle}>Toggle</button>;
}
```
