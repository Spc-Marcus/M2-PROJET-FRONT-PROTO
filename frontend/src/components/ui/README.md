# UI Component Library

A comprehensive UI component library for the Duobingo frontend application, built with TailwindCSS and TypeScript.

## Features

- ✨ **20 Production-ready Components**
- 🎨 **TailwindCSS Styling** - Modern, utility-first CSS
- 🌙 **Dark Mode Support** - All components support dark mode via Tailwind's `dark:` prefix
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 📱 **Responsive** - Mobile-first design approach
- 🎯 **TypeScript** - Full type safety with TypeScript
- 🎨 **Duolingo-inspired** - Primary color: sky-500 (#0ea5e9)
- 📝 **JSDoc Comments** - Well-documented components

## Installation

All components are located in `/frontend/src/components/ui/` and can be imported directly:

```tsx
import { Button, Input, Card } from '@/components/ui';
```

## Components

### 1. Button

Button component with multiple variants and states.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `leftIcon`, `rightIcon`: React.ReactNode
- `fullWidth`: boolean

---

### 2. Input

Text input component with label, error, and icon support.

```tsx
import { Input } from '@/components/ui';

<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
  leftIcon={<EmailIcon />}
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`, `rightIcon`: React.ReactNode
- `fullWidth`: boolean

---

### 3. Card

Card container with optional header, body, and footer sections.

```tsx
import { Card } from '@/components/ui';

<Card 
  header="Card Title" 
  footer={<Button>Action</Button>}
  hoverable
>
  Card content here
</Card>
```

**Props:**
- `header`: React.ReactNode
- `footer`: React.ReactNode
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean

---

### 4. Modal

Modal dialog with backdrop and customizable sizes.

```tsx
import { Modal } from '@/components/ui';

<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
```

**Props:**
- `isOpen`: boolean
- `onClose`: () => void
- `title`: string
- `footer`: React.ReactNode
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `closeOnBackdrop`: boolean
- `showCloseButton`: boolean

---

### 5. Badge

Badge/tag component for labels and status indicators.

```tsx
import { Badge } from '@/components/ui';

<Badge variant="green" size="md" removable onRemove={() => {}}>
  Active
</Badge>
```

**Props:**
- `variant`: 'blue' | 'green' | 'red' | 'yellow' | 'gray'
- `size`: 'sm' | 'md' | 'lg'
- `removable`: boolean
- `onRemove`: () => void

---

### 6. ProgressBar

Progress bar with percentage display and animations.

```tsx
import { ProgressBar } from '@/components/ui';

<ProgressBar 
  value={75} 
  variant="sky" 
  showLabel 
  animated 
/>
```

**Props:**
- `value`: number (0-100)
- `max`: number
- `variant`: 'blue' | 'green' | 'red' | 'yellow' | 'sky'
- `showLabel`: boolean
- `labelPosition`: 'inside' | 'outside'
- `animated`: boolean
- `size`: 'sm' | 'md' | 'lg'

---

### 7. Loader

Loading spinner with optional overlay.

```tsx
import { Loader } from '@/components/ui';

<Loader size="lg" variant="primary" text="Loading..." />
<Loader overlay text="Please wait..." />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `variant`: 'primary' | 'white' | 'gray'
- `overlay`: boolean
- `text`: string

---

### 8. Alert

Alert/toast component for notifications.

```tsx
import { Alert } from '@/components/ui';

<Alert 
  type="success" 
  title="Success" 
  dismissible 
  onDismiss={() => {}}
>
  Your changes have been saved!
</Alert>
```

**Props:**
- `type`: 'info' | 'success' | 'warning' | 'error'
- `title`: string
- `dismissible`: boolean
- `onDismiss`: () => void
- `showIcon`: boolean

---

### 9. Dropdown

Dropdown menu with keyboard navigation.

```tsx
import { Dropdown } from '@/components/ui';

<Dropdown 
  trigger="Menu"
  items={[
    { label: 'Edit', value: 'edit', onClick: () => {} },
    { label: 'Delete', value: 'delete', onClick: () => {} }
  ]}
/>
```

**Props:**
- `trigger`: React.ReactNode
- `items`: DropdownItem[]
- `align`: 'left' | 'right'

---

### 10. Tabs

Tab navigation component.

```tsx
import { Tabs } from '@/components/ui';

<Tabs 
  items={[
    { key: '1', label: 'Tab 1', content: <div>Content 1</div> },
    { key: '2', label: 'Tab 2', content: <div>Content 2</div> }
  ]}
  orientation="horizontal"
/>
```

**Props:**
- `items`: TabItem[]
- `defaultActiveKey`: string
- `activeKey`: string
- `onChange`: (key: string) => void
- `orientation`: 'horizontal' | 'vertical'

---

### 11. Tooltip

Tooltip that appears on hover.

```tsx
import { Tooltip } from '@/components/ui';

<Tooltip content="This is a tooltip" position="top">
  <button>Hover me</button>
</Tooltip>
```

**Props:**
- `content`: React.ReactNode
- `position`: 'top' | 'bottom' | 'left' | 'right'
- `delay`: number (ms)

---

### 12. Avatar

User avatar with image fallback and status indicator.

```tsx
import { Avatar } from '@/components/ui';

<Avatar 
  src="/user.jpg" 
  alt="John Doe"
  fallback="JD"
  status="online"
  size="md"
/>
```

**Props:**
- `src`: string
- `alt`: string
- `fallback`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `status`: 'online' | 'offline' | 'away' | 'busy' | null
- `shape`: 'circle' | 'square'

---

### 13. Select

Select dropdown with search and multi-select support.

```tsx
import { Select } from '@/components/ui';

<Select 
  label="Country"
  options={[{ label: 'USA', value: 'us' }]}
  value="us"
  onChange={(val) => setValue(val)}
  searchable
  multiple
/>
```

**Props:**
- `label`: string
- `options`: SelectOption[]
- `value`: string | string[]
- `onChange`: (value: string | string[]) => void
- `searchable`: boolean
- `multiple`: boolean
- `error`: string

---

### 14. Checkbox

Checkbox input with indeterminate state.

```tsx
import { Checkbox } from '@/components/ui';

<Checkbox 
  label="Accept terms" 
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  indeterminate={false}
/>
```

**Props:**
- `label`: string
- `indeterminate`: boolean
- `error`: string

---

### 15. Radio

Radio button component.

```tsx
import { Radio } from '@/components/ui';

<Radio 
  name="option"
  value="a"
  label="Option A" 
  checked={value === 'a'}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Props:**
- `label`: string
- `error`: string

---

### 16. Textarea

Textarea with auto-resize and character counter.

```tsx
import { Textarea } from '@/components/ui';

<Textarea 
  label="Description" 
  autoResize
  showCounter
  maxLength={500}
/>
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `autoResize`: boolean
- `showCounter`: boolean

---

### 17. Table

Table component with sorting and selection.

```tsx
import { Table } from '@/components/ui';

<Table 
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' }
  ]}
  data={users}
  selectable
  onSelectionChange={(keys) => setSelected(keys)}
/>
```

**Props:**
- `columns`: TableColumn[]
- `data`: any[]
- `rowKey`: (row, index) => string | number
- `selectable`: boolean
- `selectedRows`: (string | number)[]
- `onSelectionChange`: (keys) => void
- `onSort`: (key, direction) => void

---

### 18. Pagination

Pagination controls.

```tsx
import { Pagination } from '@/components/ui';

<Pagination 
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setPage(page)}
  siblingCount={1}
  showFirstLast
/>
```

**Props:**
- `currentPage`: number
- `totalPages`: number
- `onPageChange`: (page: number) => void
- `siblingCount`: number
- `showFirstLast`: boolean

---

### 19. EmptyState

Empty state placeholder.

```tsx
import { EmptyState } from '@/components/ui';

<EmptyState 
  title="No data found"
  description="Try adjusting your filters"
  action={<Button>Add New</Button>}
  icon={<CustomIcon />}
/>
```

**Props:**
- `icon`: React.ReactNode
- `title`: string
- `description`: string
- `action`: React.ReactNode

---

## Usage Example

Here's a complete example using multiple components:

```tsx
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Input, 
  Modal, 
  Alert,
  ProgressBar,
  Badge 
} from '@/components/ui';

function Example() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="p-6 space-y-6">
      {showAlert && (
        <Alert 
          type="success" 
          title="Welcome!"
          dismissible 
          onDismiss={() => setShowAlert(false)}
        >
          You have successfully logged in.
        </Alert>
      )}

      <Card 
        header={
          <div className="flex items-center justify-between">
            <h2>User Profile</h2>
            <Badge variant="green">Active</Badge>
          </div>
        }
        footer={
          <Button onClick={() => setIsModalOpen(true)}>
            Edit Profile
          </Button>
        }
      >
        <div className="space-y-4">
          <Input label="Name" defaultValue="John Doe" />
          <Input label="Email" type="email" defaultValue="john@example.com" />
          <ProgressBar value={75} variant="sky" showLabel animated />
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
        size="md"
      >
        <p>Modal content here...</p>
      </Modal>
    </div>
  );
}
```

## Dark Mode

All components support dark mode automatically when using Tailwind's dark mode class strategy. Add the `dark` class to your root element to enable dark mode:

```html
<html class="dark">
  <!-- Your app -->
</html>
```

## Accessibility

All components follow ARIA best practices:
- Proper semantic HTML
- Keyboard navigation support
- Screen reader friendly
- Focus management
- ARIA labels and roles

## Customization

Components use TailwindCSS classes and can be customized via:
1. **className prop** - Add custom classes to any component
2. **Tailwind config** - Modify colors, spacing, etc. in `tailwind.config.js`
3. **Component props** - Use variant, size, and other props

## License

MIT
