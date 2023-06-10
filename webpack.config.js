import path from 'path';
import { URL } from 'url';

export default {
    devServer: {
        static: {
            directory: path.join(new URL('.', import.meta.url).pathname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    entry: './src/index.ts',
    output: {
        filename: 'stepwise-modal.js',
        path: path.resolve(new URL('.', import.meta.url).pathname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}