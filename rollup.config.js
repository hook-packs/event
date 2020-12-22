import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
const input = "src/event.js";
export default [
  {
    input,
    output: {
      name: "HookEvent",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      }),
      terser({ ie8: true }),
      filesize()
    ]
  },
  {
    input,
    output: [
      {
        file: pkg.module,
        format: "es",
        exports: "default"
      },
      {
        file: pkg.main,
        format: "cjs",
        exports: "auto"
      }
    ],
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: "node_modules/**"
      })
    ],
    external: (id) =>
      /@hook\/callback|core-js|regenerator-runtime|@babel\/runtime-corejs3/.test(
        id
      )
  }
];
