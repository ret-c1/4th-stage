module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        // '@babel/plugin-transform-typescript',
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: 'css', // `style: true` 会加载 less 文件
            },
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
            plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'],
        },
    },
};
