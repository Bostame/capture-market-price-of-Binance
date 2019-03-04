/*-------------------instantiated Exchange(Binance)------------------------------------------*/
const binance = require('node-binance-api')

function intervalFunc() {
  binance.prices((error, ticker) => {
    console.log("prices()", ticker);
    console.log("Price of BTC: ", ticker.BTCUSDT);
  });
}
intervalFunc()
setInterval(intervalFunc, 10000);
