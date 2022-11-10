/* Example in Node.js */
const axios = require('axios');
require('dotenv').config();

//console.log(process.env);

//console.log(process.env.API_KEY);

// API call based off crypto rankings
let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?sort=cmc_rank', {
      headers: {
        'X-CMC_PRO_API_KEY': 'd0fafe5d-679a-4901-bebf-c7dcea6c596a',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
  }
});