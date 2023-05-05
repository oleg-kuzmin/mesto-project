const autoprefixer = require('autoprefixer'); // подключаем плагин autoprefixer в файл
const cssnano = require('cssnano'); // подключаем плагин cssnano в файл

module.exports = {
  // подключаем плагины к PostCSS
  plugins: [
    // подключаем autoprefixer
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } говорит о том, что нужно использовать стандартные настройки минификации
    cssnano({ preset: 'default' }),
  ],
};
