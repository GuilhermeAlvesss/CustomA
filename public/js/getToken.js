'use strict';
var axios = require('axios');
var data = JSON.stringify({
    "grant_type": "client_credentials",
    "client_id": "ul8ai8v24hkwheuwmsxswzfy",
    "client_secret": "1ip1XNFThhde2i5zgAOuHLaF",
    "account_id": "526001867"
});
var config = {
    method: 'post',
    url: 'https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.auth.marketingcloudapis.com/v2/token',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};
var token = async function requestToken() {
    const response = await axios(config)
    console.log('<-- Estou na linha 23 do GETTOKEN.js retornando o response--> ', response.data);
    // console.log('Este é o meu jsonData.access_token => ', jsonData.access_token);
    return response;
}
module.exports = token