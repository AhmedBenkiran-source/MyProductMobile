import React, { Component } from 'react';
const { width, height } = Dimensions.get('window');
import { Dimensions, Image,  ActivityIndicator, FlatList,Alert, View, ScrollView, TouchableOpacity,ListView,Animated } from 'react-native';
import Icon from 'react-native-vector-icons';
import { Button, Divider, Input, Block, Text } from '../components';
import {BASE_URL} from "../constants/api_url";
import { styles } from '../style/ProductStyle';
import { theme, mocks } from '../constants';

import { fetchCommentaire  } from '../action/BrandAction';
import { fetchAddCommentaire } from '../action/BrandAction';
import { fetchFindProduitByMarque } from '../action/BrandAction';

import {renderLike} from '../render/LikeRender'
export default class Brand extends Component {
  static navigationOptions = {
    header: null,

  }
    constructor(props){
        super(props);
        this.state = {
            dataSource: null,
            isLoading: true,
            isLoadingMore: false,
            _data: null,
            page :0,
            marque : this.props.navigation.state.params.marque,
            text:null,
            searchFocus: new Animated.Value(0.6),
            searchString: null,
            avis:null,
            produits : null

        }
    }
   componentDidMount() {
       this.__FetchDataCommentaire();
       fetchFindProduitByMarque(this.state.marque.id).then((result) => {
        console.log("result" +result)

         this.setState({
           produits : result
         })
        });  
       }
    __FetchDataCommentaire=()=>{

        const {page} =this.state
    
        fetchCommentaire(page,this.state.marque.id).then((commentaire)=>{
      this.setState({
        dataSource: commentaire,
        isLoading: false,
       page : 1,
        
    });
    
    });
    
    }
    
      _fetchMoreCommentaire() {
       
        const {page} =this.state
    
        fetchCommentaire(page,this.state.marque.id).then(commentaire =>{
            this.setState({
            dataSource:  [...this.state.dataSource, ...commentaire],
            page: page + 1, 
             isLoadingMore: false,
          });
       
          }) 
      
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
                
                  <Text medium> {item.username} <Text gray caption>  { '<<' +item.email +'>>'} </Text> 
                   {item.note === 1 ?
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
                }</Text> 

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
                    <Text bold white center>Load More</Text>
                  }
                </Button>
             
            </TouchableOpacity>
        );
      }
      renderSendCommentaire(){
        const { searchString, searchFocus } = this.state;
        const isEditing = searchFocus && searchString;
        return(
          <Block>
           
            <Divider margin={[theme.sizes.padding * 0.9, 0]} />
            {this.renderLike()}
            <Block  style={styles.search}  style={styles.header}>
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

      renderProduit(){
        const {  navigation } = this.props;

        return(
          <FlatList
          data={this.state.produits}
          keyExtractor={(item, index) => 'key'+index}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate('Product', { item })}
            >
                <Divider margin={[theme.sizes.padding * 0.9, 0]} />
                  
                <Text height={20}>
                <Image 
                     style={{width: 50, height: 50}}
                     source={{uri: BASE_URL+item.icone}} />   { item.name } <Text gray caption> {item.nbrCommentaire} Avis </Text>
                </Text>
            </TouchableOpacity>

          )}
        />
        );
      }
    render() {
        const {marque } = this.state ;
        const { profile } = this.props;
    const { navigation } = this.props;

        return(
            <ScrollView showsVerticalScrollIndicator={false} style={styles.header}>
                 <Image
                    source={{uri : BASE_URL + marque.imageMarque}}
                    resizeMode="contain"
                    style={{ width, height: height / 2.8 }}
                />
                <Block style={styles.product}>
                    <Text h1 underline>{marque.libelle}</Text>
                    <Text gray light height={22}>{marque.description}</Text>
                    {this.renderProduit()}
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
    handelCommentaire(){
        fetchAddCommentaire(this.state.searchString,this.state.avis,this.state.marque.id);
        Alert.alert(
          'Commentaire',
          'Votre commentaire a été bien envoyé .',
          [
            {text: 'OK', onPress: () =>{ this.setState({searchString : null}) }}
          ],
          {cancelable: false},
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
}

Brand.defaultProps = {
  profile: mocks.profile,
}
