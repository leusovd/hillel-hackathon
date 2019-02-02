const path = require('path');
const argv = require("yargs").argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const isDevelopment = argv.mode === "development";
let isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/docs');

const config = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "bundle.js",
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          isDevelopment ? "vue-style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                isProduction ? require("cssnano") : () => {},
                require("autoprefixer")
              ]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            'scss': ["vue-style-loader", "css-loader", "sass-loader"],
            'sass': [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }, {
      	test: /\.(gif|png|jpe?g|svg)$/i,
      	use: [{
      		loader: 'file-loader',
      		options: {
      			name: 'images/[name][hash].[ext]'
      		}
      	}, {
      		loader: 'image-webpack-loader',
      		options: {
      			mozjpeg: {
      				progressive: true,
      				quality: 70
      			}
      		}
      	}, ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin("docs", {}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }
};

module.exports = config;