import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@design-system/components';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'info',
        'muted',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    rounded: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg', 'none'],
    },
    dot: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
      <Badge size="lg">Large</Badge>
      <Badge size="xl">Extra Large</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Badge
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          Verified
        </Badge>
        <Badge
          rightIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          }
        >
          Dismissible
        </Badge>
      </div>
      <div className="flex gap-4">
        <Badge
          variant="success"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          Active
        </Badge>
        <Badge
          variant="warning"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          }
        >
          Warning
        </Badge>
      </div>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Badge dot>Online</Badge>
        <Badge dot variant="success">
          Active
        </Badge>
        <Badge dot variant="warning">
          Pending
        </Badge>
        <Badge dot variant="destructive">
          Error
        </Badge>
      </div>
      <div className="flex gap-4">
        <Badge dot dotColor="#10b981" size="sm">
          Small
        </Badge>
        <Badge dot dotColor="#3b82f6" size="lg">
          Large
        </Badge>
        <Badge dot dotColor="#f59e0b" size="xl">
          Extra Large
        </Badge>
      </div>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge rounded="none">None</Badge>
      <Badge rounded="sm">Small</Badge>
      <Badge rounded="md">Medium</Badge>
      <Badge rounded="lg">Large</Badge>
      <Badge rounded="default">Full (Default)</Badge>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div>
        <Badge>New</Badge> Feature announcement
      </div>
      <div>
        <Badge variant="secondary">Beta</Badge> This feature is in beta
      </div>
      <div>
        <Badge variant="destructive">Error</Badge> Something went wrong
      </div>
      <div>
        <Badge variant="success" dot>
          Active
        </Badge>{' '}
        User is currently online
      </div>
      <div>
        <Badge variant="warning" leftIcon="⚠">
          Warning
        </Badge>{' '}
        Please review this item
      </div>
    </div>
  ),
};

export const Combinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Badge variant="success" size="lg" dot leftIcon="✓">
          Premium
        </Badge>
        <Badge variant="info" size="lg" rounded="md">
          Pro
        </Badge>
        <Badge variant="warning" size="lg" rounded="lg">
          Trial
        </Badge>
      </div>
      <div className="flex gap-4">
        <Badge variant="default" size="sm" rounded="sm">
          Small Rounded
        </Badge>
        <Badge variant="outline" size="xl" rounded="full">
          Extra Large Full
        </Badge>
      </div>
    </div>
  ),
};
