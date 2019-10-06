import {CATEGORIE_URL , PRODUIT_URL} from "../constants/api_url";
import {profile} from "../constants/mocks"

async function fetchCategorie(){
    const url = CATEGORIE_URL + '/libelle';
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
async function fetchProductByCategorie(id){
       console.log("id " + id)
        const url = PRODUIT_URL + '/findSimpleProduitByCategory/'+id;
        const response = await  fetch(url, {
            method: 'GET',
            headers: {
            'Authorization': profile.token,
            'Content-Type': 'application/json',
            }
            }) ;
      
          const data = await response.json();
          console.log("id" + data.content)

           return data.content;
          }
export {fetchProductByCategorie}
export {fetchCategorie}