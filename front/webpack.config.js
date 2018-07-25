const path = require('path');

module.exports = {
  // entry: ['webpack/hot/dev-server','./src/index.js'],
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },


  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    hot: true,
    inline: true,
    port: 9000
  }
};
