// tailwind.config.ts
import sharedConfig from "@repo/tailwind-config";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
