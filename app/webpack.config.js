module.exports = {  
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
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
}