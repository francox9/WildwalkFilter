const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  watch: true,
  // mode: "production",
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: "babel-loader",
          options: {
            // presets:['es2015','@babel/react']
          } 
        }],
        exclude: /node_modules/,
      },
      {
        test: /.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // modules: true
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
};
