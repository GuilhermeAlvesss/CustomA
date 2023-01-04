var express = require('express');
var fetch = require('node-fetch');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000




// function getToken(){
    
//     var myHeaders = new Headers();

//     var testando;

//     var resultAcces;

//     var token;

//     myHeaders.append("Content-Type", "application/json");
    
//     var raw = JSON.stringify({
    
//       "grant_type": "client_credentials",
    
//       "client_id": "ul8ai8v24hkwheuwmsxswzfy",
    
//       "client_secret": "1ip1XNFThhde2i5zgAOuHLaF",
    
//       "account_id": "526001867"
    
//     });
    
//     var requestOptions = {
    
//       method: 'POST',
    
//       headers: myHeaders,
    
//       body: raw,
    
//       redirect: 'follow'
//     };
//     fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.auth.marketingcloudapis.com/v2/token", requestOptions)
    
//       .then(response => response.text())
    

//       .then(result => {testando = result;
//     //   console.log('result.access_token =>' + testando)
//       resultAcces = JSON.parse(testando);
//       console.log(resultAcces.access_token);
//       token =  resultAcces.access_token;
      
//       })


//       .catch(error => console.log('error', error))

//       return token;
//     }
   




  


function sendDataExtension(contactKey,FirstName,LastName) {

    var myHeaders = new Headers();

    var testando;

    var resultAcces;

    var token;

    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
    
      "grant_type": "client_credentials",
    
      "client_id": "ul8ai8v24hkwheuwmsxswzfy",
    
      "client_secret": "1ip1XNFThhde2i5zgAOuHLaF",
    
      "account_id": "526001867"
    
    });
    
    var requestOptions = {
    
      method: 'POST',
    
      headers: myHeaders,
    
      body: raw,
    
      redirect: 'follow'
    };
    let tokenTeste;
    fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.auth.marketingcloudapis.com/v2/token", requestOptions)
    
      .then(response => response.text())
    

      .then(result => {testando = result;
    //   console.log('result.access_token =>' + testando)
      resultAcces = JSON.parse(testando);
      console.log('resultAcces.access_token linha 116 => ' + resultAcces.access_token);
      token =  resultAcces.access_token;
      console.log('TOKEN => ' + token);
    //   tokenTeste = token;
    //   console.log(tokenTeste);




      console.log('/n TOKEN LINHA 126 => > ' + token);
    //   var variableApi = "Bearer" + token;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " +  token);
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify([
          {
              "keys": {
                  "ContactKey": contactKey
              },
              "values": {
                  "FirstName": FirstName,
                  "LastName": LastName
              }
          }
      ]);
      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };
      fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.rest.marketingcloudapis.com//hub/v1/dataevents/key:55AA36EF-C676-4B1C-9388-8FD052D9BCB0/rowset", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));






      
      })

    

      .catch(error => console.log('error', error))


    // console.log('/n TOKEN LINHA 126 => > ' + tokenTeste);
    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer" +  token);
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify([
    //     {
    //         "keys": {
    //             "ContactKey": contactKey
    //         },
    //         "values": {
    //             "FirstName": FirstName,
    //             "LastName": LastName
    //         }
    //     }
    // ]);
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.rest.marketingcloudapis.com//hub/v1/dataevents/key:55AA36EF-C676-4B1C-9388-8FD052D9BCB0/rowset", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
};


app.use(express.static('public'))

app.post("/save", (req, resp) => {   
    console.log('Acabei de ser salvo');
    resp.send(req.send);
});


app.post("/execute", (req, resp) => {
    console.log('Estou no executando');
    console.log(req.body);
    resp.send(req.send);


     console.log(req.body.inArguments);
     resp.send(req.send);

   var contactKey = (req.body.inArguments[0].contactKey);
   console.log(contactKey);
   var FirstName = (req.body.inArguments[1].FirstName);
   console.log(FirstName);
   var LastName = (req.body.inArguments[2].LastName);
   console.log(LastName);

   
   sendDataExtension(contactKey,FirstName,LastName);


});
app.post("/publish", (req, resp) => {
    console.log('Estou publicando');
    resp.send(req.send);
});


app.listen(port, () => console.log(`App listening on port ${port}!`))
