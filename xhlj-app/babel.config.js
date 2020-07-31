module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-react-jsx-source',
        '@babel/plugin-proposal-json-strings',
        '@babel/plugin-transform-runtime',
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: 'css',
            },
            'ant',
        ],
        [
            'babel-plugin-import',
            {
                libraryName: '@material-ui/core',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'tree-shaking-mui-core',
        ],
        [
            'babel-plugin-import',
            {
                libraryName: '@material-ui/core/styles',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'tree-shaking-mui-styles',
        ],
        [
            'babel-plugin-import',
            {
                libraryName: '@material-ui/core/colors',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'tree-shaking-mui-colors',
        ],
        [
            'babel-plugin-import',
            {
                libraryName: '@material-ui/icons',
                libraryDirectory: '',
                camel2DashComponentName: false,
            },
            'tree-shaking-mui-icons',
        ],
    ],
    env: {
        production: {
            only: ['app'],
            plugins: [
                'lodash',
                'transform-react-remove-prop-types',
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
            ],
        },
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'dynamic-import-node',
                'dynamic-import-node-babel-7',
            ],
        },
    },
};
