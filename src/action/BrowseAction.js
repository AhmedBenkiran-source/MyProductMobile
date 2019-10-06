import {PRODUIT_URL} from "../constants/api_url";
import {MARQUE_URL} from "../constants/api_url";
import {profile} from "../constants/mocks"


async function fetchProduitSimpleObjet(page,id,search){
  
    const url = PRODUIT_URL + '/allSimpleProduit/'+id +'?page='+page+'&search='+search;
    const response = await  fetch(url, {
        method: 'GET',
        }) ;
  
      const data = await response.json();
      
       return data.content;
}
async function fetchMarqueSimpleObjet(page){
        const url = MARQUE_URL + '/allSimpleMarque' +'?page='+page;
        const response = await  fetch(url, {
            method: 'GET',
           }) ;
      
          const data = await response.json();
           return data.content;
}

export {fetchProduitSimpleObjet}
export {fetchMarqueSimpleObjet}