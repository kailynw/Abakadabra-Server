const nodemon= require('nodemon')
const axios= require('axios')
const cheerio = require('cheerio');
const { resolve } = require('path');

class Forecast{
  
  getPrices(stock){
    const url= `https://walletinvestor.com/mun-stock-forecast/${stock}-stock-prediction`
    
    return new Promise((resolve,reject)=>{
      axios.get(url).then(res=>{
        const html= res.data
        const $ = cheerio.load(html);
        const name= $('.breadcrumb-share > ul > li.active').text()
        const stockData= {stock, name, prices: this._retreivePricesFromHTML($)}
        resolve(stockData)
      }).catch(err=>{
        console.log(err)
        reject(err)
      })
    })
  }

  _retreivePricesFromHTML($){
    let prices=[]
    const pricesElement= $(" .forecast-currency-href ").map(function(i,el){
      let text= $(this).text()
          .replace('\n', '')
          .replace('▲','')
          .replace('▼','')
          .trim()
      prices.push(text);
    })

    return {
      currentPrice: prices[0],
      oneYearForecast: prices[1],
      fiveYearForecast: prices[2]
    }
  }

  
}

module.exports= Forecast
