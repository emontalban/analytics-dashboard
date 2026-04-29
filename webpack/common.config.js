// webpack plugins
const SplitChunksPlugin = require("webpack/lib/optimize/SplitChunksPlugin");

module.exports = {
  entry: {
    app: "./src/bootstrap.tsx",
    vendor: "./src/vendor.js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"],

    modules: ["node_modules"],

    alias: {
      "apexcharts$": "apexcharts/dist/apexcharts.common.js",
      "react-apexcharts$": "react-apexcharts/dist/react-apexcharts.cjs.js"
    }
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json"
          }
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },

      {
        type: "javascript/auto",
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          publicPath: "/"
        }
      },

      {
        test: /\.(mp4|webm)$/,
        loader: "url?limit=10000"
      }
    ]
  },

optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
