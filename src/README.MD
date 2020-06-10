## CSS compression and obfuscation:
## First solution

[BAD SHIT] Generate no BEM compatible style names.  
[Готовим идеальный CSS](https://habr.com/ru/company/constanta/blog/428800/)

Configurate in files:  
* webpack.base.conf.js:  
```js
const getScopedName = require('./getScopedName'); // <============ here
...
const styleLoader = isDev ? ['style-loader'] : [
    resolve('./webpack-loaders/nullLoader'),
    MiniCssExtractPlugin.loader,
]
...
const cssLoader = {
    loader: "css-loader",
    options: {
        import: true,
        modules: true,
        importLoaders: 1,
        sourceMap: isDev ? true : false,
        modules: {
            ...(isDev ? {                               // <============ here
                localIdentName: '[path]_[name]_[local]',
                } : {
                getLocalIdent: (context, localIdentName, localName) => (
                    getScopedName(localName, context.resourcePath)
                ),
            })
        }
    },
}
...
module.exports = {
...
    plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            ...(isDev ? [] : [
                new MiniCssExtractPlugin({
                  filename: '[name].[contenthash].css',
                  chunkFilename: '[name].[contenthash].css',
                }),
              ]),
        ]
}
```
* .babelrc.js:  
```js
const getScopedName = require('./build/getScopedName'); // <============ here
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        ["react-css-modules", 
            {
                autoResolveMultipleImports: true,
                filetypes: {
                    '.scss': {
                        syntax: 'postcss-scss'
                    }
                },
                generateScopedName: isDev ? '[path]_[name]_[local]' : getScopedName, // <============ here
            }
        ]
    ]
};
```

### Another solution: [How to obfuscate CSS class names with React and Webpack](https://develoger.com/how-to-obfuscate-css-class-names-with-react-and-webpack-20e2b5c49cda)  
* webpack.base.conf.js:  
```js
const styleLoader = isDev ? ['style-loader'] : [
    // resolve('./webpack-loaders/nullLoader'),  // <============ here
    {
        loader: MiniCssExtractPlugin.loader,
    }
]
...
const cssLoader = {
    loader: "css-loader",
    options: {
        import: true,
        modules: true,
        importLoaders: 1,
        sourceMap: isDev ? true : false,
        modules: {
            localIdentName: isDev ? '[path]_[name]_[local]' : '[sha1:hash:hex:4]'
        }
    },
}
...
module.exports = {
...
    plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            ...(isDev ? {                               // <============ here
                localIdentName: '[path]_[name]_[local]',
                } : {
                getLocalIdent: (context, localIdentName, localName) => (
                    getScopedName(localName, context.resourcePath)
                ),
            })
        ]
}
```
* .babelrc.js:  
```js
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        ["react-css-modules", 
            {
                autoResolveMultipleImports: true,
                filetypes: {
                    '.scss': {
                        syntax: 'postcss-scss'
                    }
                },
                generateScopedName: isDev ? '[path]_[name]_[local]' : '[sha1:hash:hex:4]',
            }
        ]
    ]
};
```

## Packages
[react-router](https://reacttraining.com/react-router/)  
[react-moment](https://www.npmjs.com/package/react-moment)  
[react.semantic-ui.com/modules/dropdown/](https://react.semantic-ui.com/modules/dropdown/)  
[react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component)  