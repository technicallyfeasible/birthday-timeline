require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    head: {
      titleTemplate: 'Happy Birthday',
      meta: [
        {name: 'description', content: 'Birthday Timeline'},
        {charset: 'utf-8'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Happy Birthday'},
        {property: 'og:description', content: 'Birthday Timeline'},
      ]
    }
  },
}, environment);
