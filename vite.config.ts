import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    visualizer({
      template: 'sunburst', // "sunburst" | "treemap" | "flamegraph"
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html',
    }) as PluginOption,
  ],
});
