/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin(), vitePluginRequire()],
  build: {
    outDir: 'build',
  },
});
