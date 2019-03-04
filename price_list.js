/*-------------------instantiated Exchange(Binance)------------------------------------------*/
const binance = require('node-binance-api')().options({
  APIKEY: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
  APISECRET: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

function intervalFunc() {
  binance.prices((error, ticker) => {
    console.log("prices()", ticker);
    console.log("Price of BTC: ", ticker.BTCUSDT);
  });
}
intervalFunc()
setInterval(intervalFunc, 10000);
