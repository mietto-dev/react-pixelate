import type { Meta, StoryObj } from "@storybook/react";
import { Pixelate } from "../../src/pixelate/pixelate";
import src from "./image.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pixelate Image (override)",
  component: Pixelate,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Pixelate>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: { src },
};

export const WidthOnly: Story = {
  args: { src, width: 500 },
};

export const HeightOnly: Story = {
  args: { src, height: 500 },
};

export const WidthHeight: Story = {
  args: { src, width: 300, height: 500 },
};

export const PixelSize: Story = {
  args: { src, width: 300, height: 500, pixelSize: 5 },
};
