// webpack.mix.js

let mix = require('laravel-mix');

mix.disableSuccessNotifications();

mix.js('src/js/main.js', 'js')
   .js('inc/blocks/blocks.js', 'js')
   .sass('src/scss/main.scss', 'css')
   .setPublicPath('assets');