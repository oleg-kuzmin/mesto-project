const path = require('path'); // подключаем path к конфигу вебпак (утилита, которая превращает относительный путь в абсолютный)
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключаем плагин html-webpack-plugin (для работы с html)
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключаем плагин clean-webpack-plugin (для очистки dist)
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключаем плагин mini-css-extract-plugin (объединение css)

// module.exports — это синтаксис экспорта в Node.js
module.exports = {
  //# точка входа — файл index.js в папке src
  entry: { main: './src/pages/index.js' },

  //# объект output (точка выхода) - итоговый файл, куда «Вебпак» сложит весь js-код
  output: {
    path: path.resolve(__dirname, 'dist'), // абсолютный путь к точке выхода
    filename: 'main.js', // имя файла, куда «Вебпак» положит код
    publicPath: '', // свойство для обновления путей внутри CSS- и HTML-файлов
  },

  //# режим разработчика
  mode: 'development',

  //# настройки локального сервера
  devServer: {
    watchFiles: path.join(__dirname, 'src'),
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true, // сайт будет открываться сам при запуске npm run dev
  },

  //# настройка Babel
  module: {
    // rules — это массив правил, добавим в него объект правил для бабеля
    rules: [
      {
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: 'babel-loader', // при обработке этих файлов нужно использовать babel-loader
        exclude: '/node_modules/', // исключает папку node_modules, файлы в ней обрабатывать не нужно
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
        type: 'asset/resource', // значение asset/resource позволяет переносить исходные файлы в конечную сборку в том же формате
      },
      {
        test: /\.css$/, // регулярное выражение, которое ищет все css файлы
        // при обработке этих файлов нужно использовать MiniCssExtractPlugin.loader, css-loader и postcss-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }, // Значение 1 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
          },
          'postcss-loader',
        ],
      },
    ],
  },

  //# plugins - массив плагинов
  plugins: [
    //# настройка html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/index.html', // путь к файлу index.html
    }),
    //# настройка clean-webpack-plugin
    new CleanWebpackPlugin(), // подключение плагина для работы Webpack с html
    //# настройка mini-css-extract-plugin
    new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
  ],
};
