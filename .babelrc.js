const getScopedName = require('./build/getScopedName');
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
                generateScopedName: isDev ? '[path]_[name]_[local]' : getScopedName,
            }
        ]
    ]
};