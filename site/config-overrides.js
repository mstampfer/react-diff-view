
const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addBabelPlugins,
} = require("customize-cra");
const path = require('path');
const log = require('console-log-level')({ level: 'info' });

const webpackAdditional = () => config => {
    /* log.info(addDecoratorsLegacy()) */
    config.devtool = 'source-map';
    config.mode = 'development';
    config.entry = {
        'index': './src/index.js'
    }
    config.context = __dirname;


    config.module.rules.push(
        {
            test: /\.worker\.js$/,
            use: { loader: 'worker-loader' }
        },
        {
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.worker\.js$/
            ],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: [
                        "@babel/proposal-export-default-from",
                        "@babel/plugin-proposal-class-properties",
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-proposal-async-generator-functions",
                        "@babel/plugin-proposal-export-namespace-from",
                        "@babel/plugin-proposal-json-strings",
                        "@babel/plugin-proposal-optional-catch-binding",
                        "@babel/plugin-proposal-unicode-property-regex",
                    ],
                    cacheDirectory: true
                }
            }]
        }
    );
    // config.resolve =
    //     {
    //         'extensions': ['.js'],
    //         'mainFiles': ['index'],
    //         'modules': ['node_modules'],
    //         'alias': {
    //             'react-diff-view': path.resolve(__dirname, '..', 'src')
    //         }
    //     };
    config.devServer = {
        'port': 9031,
        'open': true,
        'inline': true,
        'hot': false
    }
    /* log.info(config); */
    return config;
}

module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
    ...addBabelPlugins(
        /* "@babel/plugin-proposal-decorators", */
        "@babel/proposal-export-default-from",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-async-generator-functions",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-proposal-optional-catch-binding",
        "@babel/plugin-proposal-unicode-property-regex",
    ),
    webpackAdditional(),
)

