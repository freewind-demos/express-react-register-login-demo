'use strict';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import apiRouter from './api';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log
}));

app.use(express.static('./public'));

app.get('/hello', function (req, res) {
  res.send('Hello, world!');
});

app.use('/api', apiRouter);

app.listen(3000, function () {
  console.log('Listening on 3000');
});