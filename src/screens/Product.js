import React, { Component } from 'react';
import { Dimensions, Image,  ActivityIndicator, FlatList, View, ScrollView, Alert ,TouchableOpacity,Animated } from 'react-native';
import Icon from 'react-native-vector-icons';
import { Button, Divider, Input, Block, Text } from '../components';
import { theme, mocks } from '../constants';

import { styles } from '../style/ProductStyle';
import { fetchProduit } from '../action/ProduitAction';
import {BASE_URL} from "../constants/api_url";
import { fetchCommentaire } from '../action/ProduitAction';
import { fetchAddCommentaire } from '../action/ProduitAction';

import {renderLike} from '../render/LikeRender'

const { width, height } = Dimensions.get('window');
class Product extends Component {
  static navigationOptions = {
    header: null,

  }
  state = {
    produit_id : this.props.navigation.state.params.item,
    produit:[],
    categories:[],
    marque:[],
    dataSource: null,
    isLoading: true,
    isLoadingMore: false,
    _data: null,
    page :0,
    text:null,
    searchFocus: new Animated.Value(0.6),
    searchString: null,
    avis:null
  }
  componentDidMount() {

    this._FetchDataProduit();
   this.__FetchDataCommentaire();
   }
 _FetchDataProduit=()=>{
   
   fetchProduit(this.state.produit_id.id).then(data=>{
     this.setState({
       produit: data,    
       categories: data.categories,
       marque : data.marque    
     });
   });
 }
 __FetchDataCommentaire=()=>{

  const {page} =this.state

  fetchCommentaire(page,this.state.produit_id.id).then((commentaire)=>{
this.setState({
  dataSource: commentaire,
  isLoading: false,
 page : 1,
  
});

});

}

_fetchMoreCommentaire() {
 
  const {page} =this.state

  fetchCommentaire(page,this.state.produit_id.id).then(commentaire =>{
      this.setState({
      dataSource:  [...this.state.dataSource, ...commentaire],
      page: page + 1, 
       isLoadingMore: false,
    });
 
    }) 

}
handelCommentaire(){
  fetchAddCommentaire(this.state.searchString,this.state.avis,this.state.produit_id.id);
  Alert.alert(
    'Commentaire',
    'Votre commentaire a été bien envoyé .',
    [
      {text: 'OK', onPress: () =>{ this.setState({searchString : null}) }}
    ],
    {cancelable: false},
  ); 
}
renderFooter() {
  return (
  //Footer View with Load More button
      <TouchableOpacity
       locations={[0.5, 1]}
       style={styles.footer}
       colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
       
        //On Click of button calling loadMoreData function to load more data
        >
           <Button gradient onPress={() => this._fetchMoreCommentaire()} >
            {this.state.isloading ?
              <ActivityIndicator size="small" color="white" /> : 
              <Text bold white center>Charger plus de commentaire</Text>
            }
          </Button>
       
      </TouchableOpacity>
  );
}
  renderGallery() {
    const { produit } = this.state;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={produit.imageProduit}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={{uri : BASE_URL + item}}
            resizeMode="contain"
            style={{ width, height: height / 2.8 }}
          />
        )}
      />
    );
  }
  renderCommentaire(){
    return(
       <Block>
            <FlatList
          style={{ width: '100%' }}
          data={this.state.dataSource}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              
              <Text medium> {item.username} <Text gray caption>  { '<<' +item.email +'>>'}
               </Text>   {item.note === 1 ?
                <Icon.FontAwesome
                name={"thumbs-up"}
                size={theme.sizes.base * 1.5 }
                color={theme.colors.primary}
                onPress={() => this.setState({ avis: '1' })}
                />:
                <Icon.FontAwesome
                name={"thumbs-down"}
                size={theme.sizes.base * 1.5 }
                color={theme.colors.primary}
                onPress={() => this.setState({ avis: '0' })}
                 />   
                }
                </Text> 
              
              <Text  height={20}>{item.descritpion}</Text>
             
            </View>
          )}
         ItemSeparatorComponent={() => <Divider margin={[theme.sizes.padding * 0.9, 0]} />
        }
         ListFooterComponent={this.renderFooter.bind(this)}
          //Adding Load More button as footer component
        />
       </Block>
     
      
  
  );
}
handleSearchFocus(status) {

  Animated.timing(
    this.state.searchFocus,
    {
      toValue: status ? 0.8 : 0.6, // status === true, increase flex size
      duration: 150, // ms
    }
  ).start();
}

  renderSendCommentaire(){
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;
    return(
      <Block>
    
            <Divider margin={[theme.sizes.padding * 0.9, 0]} />
       { this.renderLike()}
       <Block  style={styles.search}>
              <Input
                placeholder="Vore commentaire ..."
                placeholderTextColor={theme.colors.gray2}
                style={styles.searchInput}
                onFocus={() => this.handleSearchFocus(true)}
                onBlur={() => this.handleSearchFocus(false)}
                onChangeText={text => this.setState({ searchString: text })}
                value={searchString}
                onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
                rightStyle={styles.searchRight}
                rightLabel={
                  <Icon.FontAwesome
                    name={"send"}
                    size={theme.sizes.base * 1.5 }
                    color={theme.colors.primary}
                    type='evilicon'
                    style={styles.searchIcon}
                    onPress={() => this.handelCommentaire()}
                  />
                }
              />
              
        </Block>
      </Block>
    
       
      
    );
  }
  render() {
    const { produit } = this.state;
    const { categories } = this.state;
    const { marque } = this.state;
    const { navigation } = this.props;
    const { profile } = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.header}>
        {this.renderGallery()}
        <Block style={styles.product} >
          <Text h1 underline>{produit.nameProduit}</Text>
          <TouchableOpacity
                key={marque.id}
                onPress={() => navigation.navigate('Brand', { marque })}
              >
           <Text h3 underline >{marque.libelle}<Text gray caption> {'(détails)'} </Text></Text>
          </TouchableOpacity>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>
          
            {categories.map((item) => (
              <Text key={item.id} caption gray style={styles.tag}>
                {item.libelle}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>{produit.description}</Text>
          
          <Divider margin={[theme.sizes.padding * 0.9, 0]} />
          <Block>
          <Text h3 underline>Commentaire</Text>
            {this.renderCommentaire()}
            {profile['token'] != null ?
                   
                       this.renderSendCommentaire():
                      <Button onPress={() => navigation.navigate('Login')}>
                        <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                        Pour ajouter votre avis il faut d'abord authentifier?
                        </Text>
                     </Button>
            }
          </Block>
        </Block>
      </ScrollView>
    )
  }
  renderLike(){
    return(
      <View style={{ flexDirection: 'row'}}>
        <Text   style={[{ width: "25%" }]} gray caption> Votre avis </Text>

        <View  style={[{ width: "15%" }]}>
        <Icon.FontAwesome
                      name={"thumbs-up"}
                      size={theme.sizes.base * 1.5 }
                      color={theme.colors.primary}
                      onPress={() => this.setState({ avis: '1' })}
          />
           </View>

           <View  style={[{ width: "15%" }]}>

          <Icon.FontAwesome
                      name={"thumbs-down"}
                      size={theme.sizes.base * 1.5 }
                      color={theme.colors.primary}
                      onPress={() => this.setState({ avis: '0' })}
           />   
        </View>
          
                 
      </View>
    );
    
  }
}

Product.defaultProps = {
  profile: mocks.profile,
}
export default Product;

