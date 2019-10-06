import {profile} from "../constants/mocks"
import {PRODUIT_URL} from "../constants/api_url"
import {COMMENTAIRE_URL} from "../constants/api_url"

async function fetchProduit(id){
    const url = PRODUIT_URL + '/' + id;
    const response = await  fetch(url, {
        method: 'GET',
        headers: {
        'Authorization': profile.token,
        'Content-Type': 'application/json',
        }
        }) ;
  
      const data = await response.json();
       return data;
    }
async function fetchCommentaire(page,id){
    console.log("id " + id +"  ", page)
        const url = COMMENTAIRE_URL + '/findproduit/pagination/' + id + '?page='+page;
        const response = await  fetch(url, {
            method: 'GET',
            headers: {
            'Authorization': profile.token,
            'Content-Type': 'application/json',
            }
            }) ;
      
          const data = await response.json();
           return data.content;
    }

async function fetchAddCommentaire(description,note,id_type){
    let parameters = { description ,note,type:'produit',id_type};

      console.log("id " +description)
      console.log("id " +profile.id)

      const url = COMMENTAIRE_URL + '/add/'+profile.id ;
      const response = await  fetch(url, {
      method: 'POST',
       headers: {
       'Authorization': profile.token,
        'Content-Type': 'application/json',
         },
         body: JSON.stringify(parameters)
        }) ;
              
      const data = await response.json();
      return data.content;
    }

export {fetchProduit}
export {fetchCommentaire}
export {fetchAddCommentaire}