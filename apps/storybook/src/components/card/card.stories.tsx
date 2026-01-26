import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@design-system/components';
import { Button } from '@design-system/components';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'flat'],
    },
    hoverable: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="default" className="w-96">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card with border and shadow</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
      <Card variant="outlined" className="w-96">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Thicker border variant</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
      <Card variant="elevated" className="w-96">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Enhanced shadow variant</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
      <Card variant="flat" className="w-96">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>No shadow, no border</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
    </div>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card hoverable className="w-96">
        <CardHeader>
          <CardTitle>Hoverable Card</CardTitle>
          <CardDescription>Hover to see the effect</CardDescription>
        </CardHeader>
        <CardContent>This card has hover effects enabled.</CardContent>
      </Card>
      <Card hoverable variant="elevated" className="w-96">
        <CardHeader>
          <CardTitle>Hoverable Elevated</CardTitle>
          <CardDescription>Combined with elevated variant</CardDescription>
        </CardHeader>
        <CardContent>Enhanced hover effect with elevation.</CardContent>
      </Card>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card
        clickable
        onClick={() => alert('Card clicked!')}
        className="w-96"
      >
        <CardHeader>
          <CardTitle>Clickable Card</CardTitle>
          <CardDescription>Click anywhere on the card</CardDescription>
        </CardHeader>
        <CardContent>This card is clickable and has active state.</CardContent>
      </Card>
      <Card
        clickable
        hoverable
        onClick={() => alert('Interactive card clicked!')}
        variant="elevated"
        className="w-96"
      >
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Both clickable and hoverable</CardDescription>
        </CardHeader>
        <CardContent>Try clicking or hovering over this card.</CardContent>
      </Card>
    </div>
  ),
};

export const TitleSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-96">
        <CardHeader>
          <CardTitle size="sm">Small Title</CardTitle>
          <CardDescription>Small title size</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle size="default">Default Title</CardTitle>
          <CardDescription>Default title size</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle size="lg">Large Title</CardTitle>
          <CardDescription>Large title size</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
      </Card>
    </div>
  ),
};

export const ContentPadding: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>No Padding</CardTitle>
        </CardHeader>
        <CardContent padding="none">
          <div className="bg-muted p-4 rounded">Content with no padding</div>
        </CardContent>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Small Padding</CardTitle>
        </CardHeader>
        <CardContent padding="sm">Content with small padding</CardContent>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Default Padding</CardTitle>
        </CardHeader>
        <CardContent padding="default">Content with default padding</CardContent>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Large Padding</CardTitle>
        </CardHeader>
        <CardContent padding="lg">Content with large padding</CardContent>
      </Card>
    </div>
  ),
};

export const FooterAlignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Start Aligned</CardTitle>
        </CardHeader>
        <CardContent>Content here</CardContent>
        <CardFooter justify="start">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Center Aligned</CardTitle>
        </CardHeader>
        <CardContent>Content here</CardContent>
        <CardFooter justify="center">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>End Aligned</CardTitle>
        </CardHeader>
        <CardContent>Content here</CardContent>
        <CardFooter justify="end">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Space Between</CardTitle>
        </CardHeader>
        <CardContent>Content here</CardContent>
        <CardFooter justify="between">
          <Button variant="ghost">Back</Button>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const CompleteExample: Story = {
  render: () => (
    <Card hoverable clickable variant="elevated" className="w-96">
      <CardHeader>
        <CardTitle size="lg">Premium Plan</CardTitle>
        <CardDescription>
          Get access to all premium features and priority support
        </CardDescription>
      </CardHeader>
      <CardContent padding="lg">
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Unlimited projects</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>Custom integrations</li>
        </ul>
      </CardContent>
      <CardFooter justify="between">
        <div>
          <span className="text-2xl font-bold">$29</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <Button>Subscribe</Button>
      </CardFooter>
    </Card>
  ),
};
