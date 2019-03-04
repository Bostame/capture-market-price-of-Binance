/*-------------------Instantiate an exchange class from ccxt---------------------------------*/
const ccxt = require ('ccxt')
/*----------------------------------Handling uncaughtException--------------------------------*/

process.on ('uncaughtException',  e => { log.error (e); process.exit (1) })
process.on ('unhandledRejection', e => { log.error (e); process.exit (1) })

/*--------------------------------instantiated Symbols----------------------------------------*/
const symbols = ['BNB/BTC']

/*-------------------instantiated Exchange(Binance)------------------------------------------*/
const exchange = 'binance'
/*------------------------Get price of specific symbols--------------------------------------*/
async function market_price() {
    try {
      if (exchange.has['fetchTickers']) {
          console.log(await (exchange.fetchTickers (symbols['price'])))
      }
      else {
            console.log(exchange.id + ' does not have ' + symbols)
        }

    } catch (e) {
        if (e instanceof ccxt.DDoSProtection) {
            console.log(exchange.id, '[DDoS Protection]')
        } else if (e instanceof ccxt.RequestTimeout) {
            console.log(exchange.id, '[Request Timeout]')
        } else if (e instanceof ccxt.AuthenticationError) {
            console.log(exchange.id, '[Authentication Error]')
        } else if (e instanceof ccxt.ExchangeNotAvailable) {
            console.log(exchange.id, '[Exchange Not Available]')
        } else if (e instanceof ccxt.ExchangeError) {
            console.log (exchange.id, '[Exchange Error]')
        } else if (e instanceof ccxt.NetworkError) {
            console.log(exchange.id, '[Network Error]')
        } else {
            throw e
        }
    }
}
/*-------------------------interval--------------------------------------------------------*/
function intervalFunc() {
market_price()
}
intervalFunc()
setInterval(intervalFunc, 10000);
