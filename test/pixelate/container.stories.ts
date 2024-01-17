import type { Meta, StoryObj } from "@storybook/react";
import { PixelateContainer } from "./container";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pixelate Image (container)",
  component: PixelateContainer,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof PixelateContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Bigger: Story = {
  args: { width: 700, height: 700 },
};

export const Big: Story = {
  args: { width: 500, height: 500 },
};

export const Normal: Story = {
  args: { width: 300, height: 300 },
};

export const Small: Story = {
  args: { width: 180, height: 180 },
};
