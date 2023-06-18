import path from 'path';
import { URL } from 'url';
import FileManagerPlugin from 'filemanager-webpack-plugin';

export default {
    devServer: {
        static: {
            directory: path.join(new URL('.', import.meta.url).pathname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    target: ['web', 'es2015'],
    entry: {
        singleModal: './src/singleModal.ts',
        stepwiseModal: {
            dependOn: 'singleModal',
            import: './src/stepwiseModal.ts'
        }
    },
    output: {
        filename: '[name].js',
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
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        { source: './dist/*.css', destination: './public' },
                        { source: './dist/*.js', destination: './public' }
                    ]
                }
            }
        }),
    ]
}