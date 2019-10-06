
import {AUTH_URL} from "../constants/api_url"


  async function fetchRegister(email,username, password ){
    const url = AUTH_URL+'/signup';
    let parameters = { email,username, password };
    let response = await  fetch(url, {
        method: 'POST',
        headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters)
        }) ;
  
      let data = await response.json();
      console.log(data)
      return data;
     
  }
 
 export {fetchRegister}