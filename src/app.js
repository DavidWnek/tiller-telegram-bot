import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import debug from 'debug';
import cors from 'cors';
import { Router } from 'express';
import routes from './controllers';
import {mockResponse} from './middlewares/mockResponse';
import TelegramBot from "./services/TelegramBot";
import {startDataBase} from "./database";

const appDebug = debug('atp:notifications');
appDebug('starting api application');

const app = express();
startDataBase();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

const router = Router();
let whitelist = [process.env.UI_URL, ...process.env.CORS_ORIGIN.split(',')];

router.use(
  '/*',
  cors({origin: (origin, callback) => {
      if(whitelist.indexOf('*') !== -1) {
        callback(null, true);
      } else if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }),
  (req, res, next) => next()
);
app.use(mockResponse);

app.use('/', router);

// Routes
routes.forEach(route => {
  app.use('/', route);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export {appDebug, bot};

export default app;
