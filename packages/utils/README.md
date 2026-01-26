# @design-system/utils

Utility functions for the design system.

## Installation

```bash
pnpm add @design-system/utils
```

## Usage

### Class Name Utility

```ts
import { cn } from '@design-system/utils';

const className = cn('base-class', condition && 'conditional-class', 'another-class');
```

### Type Guards

```ts
import { isString, isNumber, isDefined } from '@design-system/utils';

if (isString(value)) {
  // value is string
}
```

### Array Utilities

```ts
import { unique, groupBy, chunk } from '@design-system/utils';

const uniqueItems = unique([1, 2, 2, 3]);
const grouped = groupBy(items, (item) => item.category);
const chunks = chunk(array, 5);
```

### Object Utilities

```ts
import { pick, omit, get, set } from '@design-system/utils';

const picked = pick(obj, ['name', 'age']);
const omitted = omit(obj, ['password']);
const value = get(obj, 'nested.path');
```

### String Utilities

```ts
import { capitalize, camelCase, kebabCase } from '@design-system/utils';

capitalize('hello world'); // 'Hello world'
camelCase('hello world'); // 'helloWorld'
kebabCase('hello world'); // 'hello-world'
```

### Formatting Utilities

```ts
import { formatCurrency, formatDate, formatRelativeTime } from '@design-system/utils';

formatCurrency(1000); // '$1,000.00'
formatDate(new Date()); // '1/27/2026'
formatRelativeTime(date); // '2 hours ago'
```
