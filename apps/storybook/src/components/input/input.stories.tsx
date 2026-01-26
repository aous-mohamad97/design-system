import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@design-system/components';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input size="sm" placeholder="Small input" />
      <Input size="default" placeholder="Default input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" required />
      <Input label="Username" placeholder="johndoe" helperText="Choose a unique username" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input
        leftIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        }
        type="email"
        placeholder="Email address"
      />
      <Input
        rightIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        }
        type="search"
        placeholder="Search..."
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input
        label="Email"
        type="email"
        error="Please enter a valid email address"
        defaultValue="invalid-email"
      />
      <Input
        label="Password"
        type="password"
        error="Password must be at least 8 characters"
        defaultValue="123"
      />
    </div>
  ),
};

export const HelperText: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input
        label="Email"
        type="email"
        helperText="We'll never share your email with anyone else."
      />
      <Input
        label="Password"
        type="password"
        helperText="Must be at least 8 characters with numbers and letters"
      />
    </div>
  ),
};

export const PasswordToggle: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        helperText="Toggle visibility with the eye icon"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input label="Disabled Input" disabled placeholder="Cannot edit" />
      <Input
        label="Disabled with Value"
        disabled
        defaultValue="Read-only value"
      />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Input type="text" label="Text" placeholder="Enter text" />
      <Input type="email" label="Email" placeholder="you@example.com" />
      <Input type="number" label="Number" placeholder="123" />
      <Input type="tel" label="Phone" placeholder="+1 (555) 123-4567" />
      <Input type="url" label="URL" placeholder="https://example.com" />
      <Input type="search" label="Search" placeholder="Search..." />
    </div>
  ),
};
