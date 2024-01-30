import type { Meta, StoryObj } from "@storybook/react";
import { ImageFilter } from "../../src/image-filter/image-filter";
import { Filter } from "../../src/filters/filters";
import src from "./image.jpg";

const GRAYSCALE = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "ImageFilter",
  component: ImageFilter,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof ImageFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

const pixelate = new Filter().pixelate();
const grayscale = new Filter().color(GRAYSCALE);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Pixelate: Story = {
  args: { src, filters: pixelate },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Grayscale: Story = {
  args: { src, filters: grayscale },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PixelateGrayscale: Story = {
  args: { src, filters: Filter.merge(pixelate, grayscale) },
};
