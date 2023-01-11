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
    data : data
  };


  var token = async function requestToken(){ 
    const response = await axios(config);
    //const jsonData = await response;
    // console.log('Estou na linha 21 do get token retornando o jsonData', jsonData);
    // console.log('Este é o meu jsonData.access_token => ', jsonData.access_token);
    return response;
}
module.exports = token;

// var token = async function requestToken()  {
//     const response = await fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.auth.marketingcloudapis.com/v2/token", requestOptions);
//     console.log('LOG getToken LINHA 21 => ', response);
//     const jsonData = await response.json();
//     console.log('Estou na linha 21 do get token retornando o jsonData', jsonData);
//     console.log('Este é o meu jsonData.access_token => ', jsonData.access_token);
//     return jsonData;
// }
// module.exports = token;