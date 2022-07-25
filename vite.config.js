import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import vitePluginImp from 'vite-plugin-imp';
import antdViteImportPlugin from 'antd-vite-import-plugin';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11']
        }),
        viteCommonjs(),
        antdViteImportPlugin(),
        react({
            jsxRuntime: 'classic',
            babel: {
                plugins: [
                    '@babel/plugin-transform-react-jsx',
                    [
                        'import',
                        {
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: 'css'
                        }
                    ]
                ]
            }
        }),
        vitePluginImp({
            optimize: true,
            libList: [
                {
                    libName: 'antd',
                    libDirectory: 'es',
                    style: (name) => `antd/es/${name}/style`
                }
            ]
        })
    ],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve('./', 'src') },
            { find: /^~@tntd/, replacement: path.resolve('./', 'node_modules/@tntd/') }
        ]
    },
    // define: {
    //     global: {},
    //     NODE_ENV: JSON.stringify('development'),
    //     'process.env': {
    //         SYS_ENV: 'development',
    //         NODE_ENV: 'development'
    //     }
    // },
    optimizeDeps: {
        entries: [],
        esbuildOptions: {
            plugins: [
                // Solves:
                // https://github.com/vitejs/vite/issues/5308
                // add the name of your package
                esbuildCommonjs(['history'])
            ]
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    // esbuild: {
    //     jsxFactory: 'h',
    //     jsxFragment: 'Fragment'
    // }
    server: {
        open: true,
        port: 10010,
        hmr: true
    }
});
