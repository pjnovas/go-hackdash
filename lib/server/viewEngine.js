
import exphbs from 'express-handlebars';

import {version} from 'package.json';
import {googleAnalytics, providers} from 'config';

var hbs = exphbs.create({
  defaultLayout: 'layout',
  extname: '.hbs',
  layoutsDir: 'views/',
  helpers: {
    json: context => JSON.stringify(context),
    version,
    showGA: options => {
      if (googleAnalytics) return options.fn(this);
      return options.inverse(this);
    },
    googleAnalytics,
    providers: () => JSON.stringify(providers),
  }
});

export default hbs.engine;
