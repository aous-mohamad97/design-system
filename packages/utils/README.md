# @design-system/utils

Utility functions for the design system.

These helpers are also re-exported from `@design-system/design-system`, which is the preferred entrypoint for most apps.

## Installation

```bash
pnpm add @design-system/utils
```

## Usage

### Class name utility

```ts
import { cn } from '@design-system/utils';

const className = cn('base-class', condition && 'conditional-class', 'another-class');
```

### Type guards

```ts
import { isString, isNumber, isDefined } from '@design-system/utils';

if (isString(value)) {
  // value is string
}
```

### Array utilities

```ts
import { unique, groupBy, chunk } from '@design-system/utils';

const uniqueItems = unique([1, 2, 2, 3]);
const grouped = groupBy(items, (item) => item.category);
const chunks = chunk(array, 5);
```

### Object utilities

```ts
import { pick, omit, get, set } from '@design-system/utils';

const picked = pick(obj, ['name', 'age']);
const omitted = omit(obj, ['password']);
const value = get(obj, 'nested.path');
```

### String utilities

```ts
import { capitalize, camelCase, kebabCase } from '@design-system/utils';

capitalize('hello world'); // 'Hello world'
camelCase('hello world'); // 'helloWorld'
kebabCase('hello world'); // 'hello-world'
```

### Formatting utilities

```ts
import { formatCurrency, formatDate, formatRelativeTime } from '@design-system/utils';

formatCurrency(1000); // '$1,000.00'
formatDate(new Date()); // '1/27/2026'
formatRelativeTime(date); // '2 hours ago'
```

### Via @design-system/design-system

You can also import these utilities directly from the aggregated package:

```ts
import { cn, formatCurrency } from '@design-system/design-system';
```
