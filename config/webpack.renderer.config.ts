import type { Configuration } from "webpack";
import path from "path";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.scss$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "sass-loader" },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        },
      },
    ],
  }
);

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
    alias: {
      "@": path.join(__dirname, "../src"),
      "@renderer": path.join(__dirname, "../src/renderer"),
      "@renderer-lrc": path.join(__dirname, "../src/renderer-lrc"),
      "@shared": path.join(__dirname, "../src/shared")
    },
  },
  externals: {
    // Native modules that should not be bundled
    'fsevents': 'commonjs2 fsevents',
    'sharp': 'commonjs2 sharp',
    
    // Node.js built-in modules - make them external so they're not bundled
    // but still available at runtime (for preload scripts with nodeIntegration)
    'fs': 'commonjs2 fs',
    'path': 'commonjs2 path',
    'fs/promises': 'commonjs2 fs/promises',
    'stream': 'commonjs2 stream',
    'util': 'commonjs2 util',
    'buffer': 'commonjs2 buffer',
    'assert': 'commonjs2 assert',
    'constants': 'commonjs2 constants',
    'zlib': 'commonjs2 zlib',
    'os': 'commonjs2 os',
    'original-fs': 'commonjs2 original-fs',
    
    // Handle node: protocol for built-in modules (Node.js 22+)
    'node:path': 'commonjs2 path',
    'node:fs': 'commonjs2 fs',
    'node:fs/promises': 'commonjs2 fs/promises',
    'node:stream': 'commonjs2 stream',
    'node:util': 'commonjs2 util',
    'node:buffer': 'commonjs2 buffer',
    'node:events': 'commonjs2 events',
    'node:url': 'commonjs2 url',
    'node:string_decoder': 'commonjs2 string_decoder',
  },
};
