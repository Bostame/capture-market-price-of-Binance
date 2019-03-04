/*-------------------Instantiate an exchange class from ccxt---------------------------------*/
const ccxt = require ('ccxt')
/*----------------------------------Handling uncaughtException--------------------------------*/

process.on ('uncaughtException',  e => { log.bright.red.error (e); process.exit (1) })
process.on ('unhandledRejection', e => { log.bright.red.error (e); process.exit (1) })

/*--------------------------------instantiated Symbols----------------------------------------*/
const symbols = ['BNB/BTC']

/*-------------------instantiated Exchange(Binance)------------------------------------------*/
const exchangeId = 'binance'
    , exchangeClass = ccxt[exchangeId]
    , exchange = new exchangeClass ({
        'apiKey': 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
        'secret': '	NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
        'timeout': 30000,
        'enableRateLimit': true,
    })
/*------------------------Get price of specific symbols--------------------------------------*/
async function market_price() {
    try {
      if (exchange.has['fetchTickers']) {
          console.log(await (exchange.fetchTickers (symbols['price'])))
      }
      else {
            colsole.log(exchange.id + ' does not have ' + symbols)
        }

    } catch (e) {
        if (e instanceof ccxt.DDoSProtection) {
            colsole.log(exchange.id, '[DDoS Protection]')
        } else if (e instanceof ccxt.RequestTimeout) {
            colsole.log(exchange.id, '[Request Timeout]')
        } else if (e instanceof ccxt.AuthenticationError) {
            colsole.log(exchange.id, '[Authentication Error]')
        } else if (e instanceof ccxt.ExchangeNotAvailable) {
            colsole.log(exchange.id, '[Exchange Not Available]')
        } else if (e instanceof ccxt.ExchangeError) {
            colsole.log (exchange.id, '[Exchange Error]')
        } else if (e instanceof ccxt.NetworkError) {
            colsole.log(exchange.id, '[Network Error]')
        } else {
            throw e
        }
    }
}
market_price()
/*-------------------------interval--------------------------------------------------------*/
function intervalFunc() {
market_price()
}
setInterval(intervalFunc, 10000);
