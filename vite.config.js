import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages (/repo-name/) and on any other path (e.g. /skin/).
export default defineConfig({ base: './', plugins: [react()] });
