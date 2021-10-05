import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

module.exports = {
  entry: path.join(__dirname, "src", "lib", "index.ts"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    library: {
      name: "AutocompleteMultiselect",
      type: "umd",
    },
  },
};
