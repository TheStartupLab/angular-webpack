var path = require('path');
var utils = require('./utils');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
  title: 'Angular-Webpack',
  baseUrl: '/',
  isDevServer: utils.isWebpackDevServer()
};

module.exports = function(){
    return {
        entry: {
            'polyfills': './src/polyfills.ts',
            'main': './src/main.browser.ts'
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.[name].js',
            sourceMapFilename: '[name].bundle.map',
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.js'],
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
            
                /* Raw loader support for *.html
                * Returns file content as string
                *
                * See: https://github.com/webpack/raw-loader
                */
                {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [utils.root('src/index.html')]
                },
                
                 /*
                * css loader support for *.css files (styles directory only)
                * Loads external css styles into the DOM, supports HMR
                *
                */
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                    exclude: [utils.root('src', 'styles')]
                },
                /*
                * sass loader support for *.scss files (styles directory only)
                * Loads external sass styles into the DOM, supports HMR
                *
                */
                {
                    test: /\.scss$/,
                    use: ['to-string-loader', 'css-loader', 'sass-loader'],
                    exclude: [utils.root('src', 'styles')]
                },

                /* File loader for supporting fonts, for example, in CSS files.
                */
                { 
                    test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                    use: 'file-loader'
                }
            ]
        },
        plugins:[
            /*
            * Plugin: CommonsChunkPlugin
            * Description: Shares common code between the pages.
            * It identifies common modules and put them into a commons chunk.
            *
            * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
            * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
            */
            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
            }),

            // This enables tree shaking of the vendor modules       
            new CommonsChunkPlugin({
                name: 'vendor',
                
                //Select the source chunks by chunk names. The chunk must be a child of the commons chunk
                chunks: ['main'],
                        
                // The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
                //shown is a custom function to detect if the module is in the node_modules via regexObj.test()
                minChunks: module => /node_modules\//.test(module.resource)
            }),
            // Specify the correct order the scripts will be injected in
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),

            /**
             * Plugin: ContextReplacementPlugin
             * Description: Provides context to Angular's use of System.import
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
             * See: https://github.com/angular/angular/issues/11580
             */
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                utils.root('src'), // location of your src
                {
                // your Angular Async Route paths relative to this root directory
                }
            ),


            new HtmlWebpackPlugin({
                template: 'src/index.html',
                title: METADATA.title,
                chunksSortMode: 'dependency',
                metadata: METADATA,
                inject: true
            }),

        ],
        
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
        

    }
}