const path = require('path');

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, './extension/scripts'),
    filename: '[name].js',
  }
}
