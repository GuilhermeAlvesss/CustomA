'use strict';
const token = require('../public/js/getToken');
const Path = require('path');
const { waitForDebugger } = require('inspector');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
//const JWTSecret = "uNEngBCkdDH6IWq-IjTlp6sZHOVqGntXeaEwTcxFX6fSVkW1gXJQsqrM4mn5KHEPT06YyjQvXJMCQAuYQBWzGmDc1NtzjIv4SzAMMyH4CUIS15OjIGi9df2Ogi4RftVAf_XYZv3SAF-BINsya7GVWpcHOMggFf4ke3PuPYHZ8hlTI6uUjJZ-Klfxb5gtKjm0NqW0kGayz2yt55j6BKv9X-G7kl0rJ2MU5d2wNDAH-TWDkr6LYgq8wVMdFevb8A2";
//const util = require('util');
const axios = require('axios');

//A Variavel token API, recebe o import da função requestToken dentro do arquivo getToken.
//A função inicial gettoken, será a função que fará a chamada do arquivo getToken, onde retornará o Access Token que precisamos para fazer a requisição para a API,


var tokenAPI;

async function gettoken() {
    tokenAPI = await token();
    console.log('<== LINHA 14 activity.js access_token ==> ', tokenAPI.data.access_token);
    return tokenAPI;
};
gettoken();


//Função sendDataExtension, será a função que irá enviar a requisição para a API

async function sendDataExtension(FirstName, parameters) {

    var data = JSON.stringify([
        {
            "keys": {
                "ContactKey": parameters[0]
            },
            "values": {
                "FirstName": FirstName,
                "LastName": parameters[1]
            }
        }
    ]);

    var config = {
        method: 'POST',
        url: "https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.rest.marketingcloudapis.com/hub/v1/dataevents/key:55AA36EF-C676-4B1C-9388-8FD052D9BCB0/rowset",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + tokenAPI.data.access_token
        },
        data: data
    };

    axios(config)
        .then((response) => {
            console.log('entrou responde' + response);
            if (response.status != 200) {
                console.log('<== ENTRO NO IF LINHA 53  ==>');

                // var responseJSON = response;
                // gettoken();
                sleep(500);
                sendDataExtension(FirstName, parameters);
            }
            console.log('LINHA 57 ' + response.status);

            var respStatus = response.status;
            console.log('LINHA 64 ' + response);
            console.log('LINHA 65 ' + response.status);

            var data = JSON.stringify([
                {
                    "keys": {
                        " Status": respStatus
                    },
                    "values": {
                        "Response": FirstName,
                    }
                }
            ]);

            var config = {
                method: 'POST',
                url: "https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.rest.marketingcloudapis.com/hub/v1/dataevents/key:656A61B7-F5B4-4C75-A2CB-65CE75A52680/rowset",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + tokenAPI.data.access_token
                },
                data: data
            }

            axios(config)
        })

        .then(result => console.log(result),
            console.log('entrou no result'))

        .catch(error => {
            console.log('error', error);
        });

//-------------------------------------------------------------------------------------------------------------------------------------


      






//---------------------------------------------------------------------------------------------------------------------------------------




        
}


















// no FETCH receberá a url da API para qual enviaremos a requisição

// fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.rest.marketingcloudapis.com/hub/v1/dataevents/key:55AA36EF-C676-4B1C-9388-8FD052D9BCB0/rowset", requestOptions)

//.then(response) é o retorno da api, onde conseguimos tratar pegando status, erro etc.

//         .then((response) => {
//             console.log('entrou responde' + response);
//             if(response.status != 200){
//                 console.log('<== ENTRO NO IF LINHA 53  ==>');

//                 var responseJSON = response.json;
//                 console.log('<== RESPONSE STATUS ==> '+ responseJSON.status);
//                 gettoken();
//                 sleep(500);
//                 sendDataExtension(FirstName, parameters);
//             }
//             console.log('LINHA 57 ' + response.status);
//         })

//         .then(result => console.log(result),
//             console.log('entrou no result'))

//         .catch(error => {
//             console.log('error', error);
//         });
// };

exports.logExecuteData = [];

exports.edit = function (req, res) {
    console.log('edit request');
    // logData(req);
    res.status(200).send('Edit')
};

exports.save = function (req, res) {
    console.log('save request');
    // logData(req);
    res.status(200).send('Save')
};


//execute é a rota de execução da jornada, depois que a jornada for salva ela entrará na rota execute
exports.execute = function (req, res) {
    console.log('Executando a chamada do Execute');
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {

        console.log('LINHA 72 => decoded: ', decoded);

        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            var decodedArgs = decoded.inArguments[0];
            var templateName = decodedArgs['templateName'];
            var FirstName = decodedArgs['phoneNumber'];
            var parameters = decodedArgs['parameters'];
            var account = decodedArgs['account'];

            // console.log('templateName', templateName);
            // console.log('phoneNumber', FirstName);
            // console.log('parameters', parameters);
            // console.log('account', account);

            sendDataExtension(FirstName, parameters);

        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });

    res.status(200).send('Execute')

};

exports.publish = function (req, res) {
    console.log('publish request');
    // logData(req);
    res.status(200).send('Publish')
};

exports.validate = function (req, res) {
    console.log('validate request');
    // logData(req);
    res.status(200).send('Validate')
};

