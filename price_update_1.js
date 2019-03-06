/*----------------------Instantiate packages------------------------------------*/
const request = require("request");
log  = require ('ololog').configure ({ locate: false })
var userDetails;
/*--------------Setting URL and headers for request-----------------------------*/
function getData(url) {
    const options = {
        url: url,
        headers: {
            'apiKey': 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
			      'secretKey': 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j',
        }
    };
/*----------------------------Return new promise--------------------------------*/
    return new Promise(function(resolve, reject) {
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}

const errHandler = function(err) {
    log.bright.red(err);
}
/*------------------------Get price of specific symbols-------------------------*/
function market_price() {
  try {
      const userProfileURL = " https://api.binance.com/api/v3/ticker/price";
      const dataPromise = getData(userProfileURL);
      dataPromise.then(JSON.parse, errHandler)
               .then(function(result) {
                 log.bright.yellow("================Prices of Current Market ====================");
                 for (var i = 0; i<5; i++){         //number of symbols price to show 'result.length for all symbol'
                 log.bright.green(result[i].symbol ,'=' ,result[i].price)
               }
               }, errHandler);
        }
        catch{
          log.bright.red(errHandler)
        }
}
market_price()
setInterval(market_price, 10*1000);
