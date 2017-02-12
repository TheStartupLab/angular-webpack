var path = require('path');
var utils = require('./config/utils');

//plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.browser.ts'
  },
  output: {
    //publicPath: '',
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.[name].js',
    //sourceMapFilename: '[name].bundle.map',
  },
  //devtool: 'source-map',
  resolve: {
      extensions: ['.ts', '.js'],

      // An array of directory names to be resolved to the current directory
      modules: [utils.root('src'), utils.root('node_modules')]
  },
  
  module:{
    rules:[
       {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
          'angular2-template-loader',
        ]
      },
      
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [utils.root('src/index.html')]
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader']
        },
    ]
  },
  plugins:[
    new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
    new CommonsChunkPlugin({
        name: 'vendor',
        
        //Select the source chunks by chunk names. The chunk must be a child of the commons chunk
        chunks: ['main'],
                
        // The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
        //shown is a custom function to detct if the module is in the node_modules via regexObj.test()
        minChunks: module => /node_modules\//.test(module.resource)
      }),
      // Specify the correct order the scripts will be injected in
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
    
    /*
       * Plugin: HtmlWebpackPlugin
       * Description: Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       *
       * See: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: 'Angular Starter App',
        chunksSortMode: 'dependency',
        metadata: {
          
        },
        inject: true
      }),
  ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
  **/
    devServer: {
      port: 8080,
      host: 'localhost',
      historyApiFallback: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

  //nodejs settings?
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
  

};