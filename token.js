function getToken(){
    
    var myHeaders = new Headers();

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
    fetch("https://mcb9kl4d8mmhtzrqdqw1vjhdlrz4.auth.marketingcloudapis.com/v2/token", requestOptions)
    
      .then(response => response.text())
    
      .then(result => console.log(result))
    
      .catch(error => console.log('error', error));
    
    }
