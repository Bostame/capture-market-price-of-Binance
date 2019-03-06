/*-------------------Instantiate an exchange class from ccxt---------------------------------*/
const ccxt = require ('ccxt')
log  = require ('ololog').configure ({ locate: false })
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
    });
/*------------------------Get price of specific symbols--------------------------------------*/
async function market_price() {
    try {
      if (exchange.has['fetchTickers']) {
          log.bright.yellow("================ Market Price of  ======================");
          console.log(await (exchange.fetchTickers (symbols)))
      }
      else {
            console.log(exchange.id + ' does not have ' + symbols)
        }

    } catch (e) {

        if (e instanceof ccxt.DDoSProtection) {
            log.bright.yellow (exchange.id, '[DDoS Protection] ' + e.message)
        } else if (e instanceof ccxt.RequestTimeout) {
            log.bright.yellow (exchange.id, '[Request Timeout] ' + e.message)
        } else if (e instanceof ccxt.AuthenticationError) {
            log.bright.yellow (exchange.id, '[Authentication Error] ' + e.message)
        } else if (e instanceof ccxt.ExchangeNotAvailable) {
            log.bright.yellow (exchange.id, '[Exchange Not Available] ' + e.message)
        } else if (e instanceof ccxt.ExchangeError) {
            log.bright.yellow (exchange.id, '[Exchange Error] ' + e.message)
        } else if (e instanceof ccxt.NetworkError) {
            log.bright.yellow (exchange.id, '[Network Error] ' + e.message)
        } else {
            throw e
        }
    }
}

/*-------------------------interval--------------------------------------------------------*/
market_price()
setInterval(market_price, 10*1000);
