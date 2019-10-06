import {COMMENTAIRE_URL , PRODUIT_URL} from "../constants/api_url"
import {profile} from "../constants/mocks"


  async function fetchCommentaire(page,id){
        const url = COMMENTAIRE_URL + '/findmarque/pagination/' + id + '?page='+page;
        const response = await  fetch(url, {
            method: 'GET',
          }) ;
      
          const data = await response.json();
           return data.content;
          }
async function fetchAddCommentaire(description,note,id_type){
            let parameters = { description ,note,type:'marque',id_type};
          
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
async function fetchFindProduitByMarque(id){
  const url = PRODUIT_URL + '/findSimpleProduitByMarque/'+id ;
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
export {fetchFindProduitByMarque}
export {fetchCommentaire}
export {fetchAddCommentaire}