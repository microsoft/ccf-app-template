import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/app.js",
  output: {
    dir: "dist/src",
    format: "es",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [nodeResolve(), commonjs()],
};
