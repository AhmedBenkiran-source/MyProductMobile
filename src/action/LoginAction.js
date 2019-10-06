
import { localstor } from '../constants/LocalStore';
import {AUTH_URL} from "../constants/api_url"
import {USER_URL} from "../constants/api_url"

import {profile} from "../constants/mocks"

  function SaveLocalStore(data){
  
      if(data.accessToken != null){
        localstor.saveItem('user_token', data.tokenType + " " + data.accessToken);
        localstor.saveItem('type_token', data.tokenType );
        localstor.saveItem('acces_token', data.accessToken);
       
      }
  }
  async function fetchFindUser(email){
    const url = USER_URL + '/'+email;
    const response = await  fetch(url, {
        method: 'GET',
        headers: {
        Accept: '*/*',
        'Authorization': profile.token,
        'Content-Type': 'application/json',
        }
        }) ;
  
      const data = await response.json();
       return data;
      }
 
  async function fetchLogin(usernameOrEmail, password ){

    localstor.saveString('user_nameOrEmail',usernameOrEmail);
    const url = AUTH_URL + '/signin';
    let parameters = { usernameOrEmail, password };
    const response = await  fetch(url, {
        method: 'POST',
        headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters)
        }) ;
  
      const data = await response.json();
      
       SaveLocalStore(data) ;
       return data;
      }

export {fetchLogin}
export {fetchFindUser}
