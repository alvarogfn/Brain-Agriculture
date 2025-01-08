import type { HtmlTagDescriptor } from '@rsbuild/core';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

const { MODE, PORT, PUBLIC_API_BASE_URL } = process.env ?? {};

const tags: HtmlTagDescriptor[] = [];

if (MODE === 'development') {
  tags.push({
    append: false,
    attrs: {
      src: 'https://unpkg.com/react-scan/dist/auto.global.js',
    },
    head: true,
    tag: 'script',
  });
}

export default defineConfig({
  html: {
    tags,
    template: './public/index.html',
  },
  plugins: [pluginReact(), pluginSvgr()],
  server: {
    port: Number(PORT ?? '3000'),
  },
  source: {
    define: {
      'process.env.MODE': JSON.stringify(MODE),
      'process.env.PUBLIC_API_BASE_URL': JSON.stringify(PUBLIC_API_BASE_URL),
    },
  },
});
