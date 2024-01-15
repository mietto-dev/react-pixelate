import type { Meta, StoryObj } from "@storybook/react";
import { Pixelate } from "../../src/pixelate/pixelate";
import imageFile from "./image.jpg";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Pixelate Image",
  component: Pixelate,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Pixelate>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: { src: imageFile },
};
