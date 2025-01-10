
import { defineConfig as viteConfig, mergeConfig } from "vite"
import {defineConfig as vitestConfig} from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default mergeConfig(
  viteConfig({
    plugins: [react()],
    base: './',
  }),
  vitestConfig({
    test: {
      include: ['src/**/*.spec.{tsx,ts}'],
    }
  })
)