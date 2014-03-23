var httpHelper = require('./helpers/httpHelper');

var bterPrices;
var cryptsyPrices;

var yays = 0;

var bterReq = {
  url: 'http://data.bter.com/api/1/ticker/vtc_btc',
	onSuccess: function(data){
		var json = JSON.parse(data.toString('utf8'));

    bterPrices = {
      sell: json.sell,
      buy: json.buy
    }
	}
}

var cryptsyReq = {
  url: 'http://pubapi.cryptsy.com/api.php?method=singleorderdata&marketid=151',
  onSuccess: function(data){
    var json = JSON.parse(data);

    var sell = json.return.VTC.sellorders[0].price;
    var buy = json.return.VTC.buyorders[0].price;

    cryptsyPrices = {
      sell: sell,
      buy: buy
    }

  }
}

setInterval(function(){

  httpHelper.get.call(bterReq);
  httpHelper.get.call(cryptsyReq);

  if(bterPrices && cryptsyPrices){
    console.log(new Date().toTimeString());

    console.log(['[CRYP] sell:', cryptsyPrices.sell, 'buy:', cryptsyPrices.buy].join(' '));
    console.log(['[BTER] sell:', bterPrices.sell, 'buy:', bterPrices.buy].join(' '));

    if(cryptsyPrices.buy > bterPrices.sell) {
      yays++;
      console.log(['YAY!!! BUY on bter by', bterPrices.sell, ' and SELL on cryptsy by', cryptsyPrices.buy].join(''));
    }

    if(cryptsyPrices.sell < bterPrices.buy) {
      yays++;
      console.log(['YAY!!! BUY on cryptsy by', cryptsyPrices.sell, ' and SELL on bter by', bterPrices.buy].join(''));
    }

    console.log(['[YAYS] ', yays].join(''));    
  }

}, 2000);





