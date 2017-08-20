const path = require('path');

const entryPath = path.resolve(__dirname, 'src/frontend');
const outputPath = path.resolve(__dirname, 'public');

module.exports = {
  entry: entryPath,
  output: {
    path: outputPath,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: entryPath,
        loader: 'babel-loader',
      },
    ],
  },
};
