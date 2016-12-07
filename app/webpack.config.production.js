const webpack = require('webpack')

module.exports = {  
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  context: __dirname,
  entry: {
    app: ['./src/main.jsx']
  },
  output: {
    path: './bundle/js',
    filename: 'bundle.js',
    publicPath: '/bundle/js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          compact: false,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy', 'babel-plugin-react-html-attrs']
        }
      }
    ]
  }
}