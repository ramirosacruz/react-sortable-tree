import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { createRequire } from 'node:module';

const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      }
    ],
    external: [
      ...Object.keys(packageJson.peerDependencies || {})
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extensions: ['.css'],
        inject: true
      }),
    ]
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.css$/]
  }
];
