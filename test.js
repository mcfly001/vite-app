import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import vitePluginImp from 'vite-plugin-imp';
import requireTransform from 'vite-plugin-require-transform';
import LessPluginImportNodeModules from 'less-plugin-import-node-modules';
import autoprefixer from 'autoprefixer';
import config from './build/config';

export default defineConfig({
    resolve: {
        alias: [
            {
                find: /@\//,
                replacement: path.resolve(__dirname, 'src') + '/'
            },
            {
                find: /^~locale/,
                replacement: path.resolve(__dirname, 'src/constants/locale') + '/'
            }
            // {
            //     find: /^~/,
            //     replacement: path.resolve(__dirname, '') + '/'
            // }
        ]
    },
    server: {
        port: '8686',
        host: '0.0.0.0',
        proxy: config.dev.proxyTable
    },
    plugins: [
        'postcss-preset-env',
        inject({
            $: 'jquery',
            React: 'react'
        }),
        react({
            babel: {
                plugins: [
                    '@babel/plugin-transform-react-jsx',
                    '@babel/plugin-syntax-jsx',
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }]
                ]
            }
        }),
        requireTransform({
            fileRegex: /.js$|.vue$/
        }),
        vitePluginImp({
            libList: [
                {
                    libName: 'antd',
                    style: (name) => `antd/lib/${name}/style/index.less`
                }
            ]
        })
    ],
    css: {
        modules: {
            localsConvention: 'camelCaseOnly'
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    hack: 'true; @import "~@tntd/antd-cover/tnt.less";'
                },
                plugins: [new LessPluginImportNodeModules()]
            }
        },
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ['Chrome > 50', 'ff > 31', 'ie 11']
                })
            ]
        }
    },
    optimizeDeps: {
        include: ['react']
    }
});
