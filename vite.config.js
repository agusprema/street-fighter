import {
    defineConfig
} from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/dashboard.js',
                'resources/js/perfect-scrollbar.min.js',
            ],
            refresh: true,
        }),
    ],
});
