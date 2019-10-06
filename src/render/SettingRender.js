import { localstor } from '../constants/LocalStore';

function renderSetting(profile){
  
    
    if(profile.username === null){
  
          localstor.receiveString('user_nameOrEmail').then((result) => {
            fetchFindUser(result).then((data)=>{
              profile['email'] = data.email;
              profile['username'] = data.username;
              profile['id'] = data.id;
  
              this.setState({ profile });   
            });  
          });
  
    }
     
  
  }

  export {renderSetting}