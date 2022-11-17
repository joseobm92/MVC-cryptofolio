const axios = require('axios');

let response = null;

// top 10 crypto name symbol price & MC by MC
async function getCryptocurrency(resolve, reject) {
    try {
        response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
    } catch (err) {
        response = null;
        // error
        console.log(err);
        reject(err);
    }
    if (response) {
        // success

        const data = response.data;

        // model bulk create & pass data to it
        return data
    }
};

async function getCoinGecko(name) {
    try {
        response = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
    } catch (err) {
        response = null;
        // error
        console.log(err);
    }
    if (response) {
        // success

        console.log("COINGECKO RESPONSE")
        // console.log(response.data.name);
        // console.log(response.data.symbol);
        // console.log(response.data.market_data.current_price.usd);
        // console.log(response.data.market_data.market_cap.usd);
        // console.log(response.data.market_data.market_cap_rank);
        // console.log(response.data.market_data.total_supply);
        // console.log(response.data.market_data.max_supply);
        // console.log(response.data.market_data.circulating_supply);

        const data = response.data;

        return data
    }
};

async function getByMarketCap() {
    try {
        response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    } catch (err) {
        response = null;
        // error
        console.log(err);
    }
    if (response) {
        // success

        console.log("COINGECKO MARKET CAP RESPONSE");

        const data = response.data;

        return data
    }
};

async function getByVolume() {
    try {
        response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=1&sparkline=false
      `);
    } catch (err) {
        response = null;
        // error
        console.log(err);
    }
    if (response) {
        // success

        console.log("COINGECKO VOLUME RESPONSE");

        const data = response.data;

        // model bulk create & pass data to it
        return data
    }
};

// get top 10 Exchanges
async function getExchanges() {
    try {
        response = await axios.get(`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=1`);
    } catch (err) {
        response = null;
        // error
        console.log(err);
    }
    if (response) {
        // success

        console.log("COINGECKO EXCHANGE RESPONSE");

        const data = response.data;

        console.log(data);

        // model bulk create & pass data to it
        return data
    }
};

module.exports = {
    getCryptocurrency,
    getCoinGecko,
    getByMarketCap,
    getByVolume,
    getExchanges
}