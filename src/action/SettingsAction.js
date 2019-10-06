import {USER_URL} from "../constants/api_url";

async function fetchEditUser(profile){
    console.log("fetch " +profile)
    const url = USER_URL + '/update';
    let parameters = { id:profile.id ,username:profile.username,email:profile.email};
    const response = await  fetch(url, {
        method: 'PUT',
        headers: {
        'Authorization': profile.token,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters)       
        }) ;
  
      const data = await response.json();
      console.log(data)
      // SaveLocalStore(data) ;
       return data;
      }

export {fetchEditUser}