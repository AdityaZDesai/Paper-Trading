
require('dotenv').config()


function handler(req, res){
    const {stock} = req.query;
    const finnhub = require('finnhub');

    console.log("IN THE BACKEND");
    //using the finnhub api in order to get the stock prices
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = process.env.API_KEY;
    const finnhubClient = new finnhub.DefaultApi();
    finnhubClient.quote(`${stock}`, (error, data, response) => {
      console.log(data.c)
        // const price = response.result.filter((u) => u.symbol == stock);
        // console.log(price)
        res.status(200).json(data.c);
      });

}

export default handler;