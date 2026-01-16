import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Table, TableColumn } from "@recoverlution/ui";

const columns: TableColumn[] = [
  { key: "item", label: "Item" },
  { key: "content", label: "Content" },
  { key: "score", label: "Score", align: "right" },
  { key: "priority", label: "Priority", align: "right" },
  { key: "tags", label: "Tags" },
];

const rows = [
  {
    item: "navicue",
    content: "journey/anchor",
    score: "0.86",
    priority: "9",
    tags: "recovery, clarity",
  },
  {
    item: "practice",
    content: "soundbite/clarity",
    score: "0.73",
    priority: "7",
    tags: "calm",
  },
  {
    item: "insight",
    content: "article/growth",
    score: "0.65",
    priority: "6",
    tags: "growth",
  },
];

const meta = {
  title: "Design System/Table",
  component: Table,
  args: {
    columns,
    rows,
    caption: "Feed queue",
    dense: false,
  },
  argTypes: {
    dense: { control: "boolean" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Dense: Story = {
  args: { dense: true },
};
