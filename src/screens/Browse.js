import React, { Component } from 'react'
import {Animated, Dimensions, Image, Alert, ActivityIndicator,Picker,TouchableOpacity,ListView ,View} from 'react-native'
import Icon from 'react-native-vector-icons';
import { Card, Input,Badge, Button, Block,Text } from '../components';

import { theme, mocks } from '../constants';
import{fetchFindUser} from "../action/LoginAction"
import { localstor } from '../constants/LocalStore';
import { fetchProduitSimpleObjet } from '../action/BrowseAction';
import { fetchCategorie } from '../action/FilterAction';
import { LinearGradient } from 'expo';

import {BASE_URL} from "../constants/api_url"
import {styles} from "../style/BrowseStyle";
const { width, height } = Dimensions.get('window');
class Browse extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.fetchMoreProduct = this._fetchMoreProduct.bind(this);
    this.state = {
      page:0,
      fetchDataSource: null,
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      active: 'List des produits',
      categories: [],
      profile: {},
      searchFocus: new Animated.Value(0.6),
      searchString: null,
      findCategory : -1 ,
      libelleCategorie : []
    }

  
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

renderSearch() {
  const { searchString, searchFocus } = this.state;
  const isEditing = searchFocus && searchString;

  return (
    <Block animated middle flex={searchFocus} style={styles.search}>
      <Input
        placeholder="Rechercher"
        placeholderTextColor={theme.colors.gray2}
        style={styles.searchInput}
        onFocus={() => this.handleSearchFocus(true)}
        onBlur={() => this.handleSearchFocus(false)}
        onChangeText={text => this.setState({ searchString: text }) }
        value={searchString}
        onRightPress={() => isEditing ? this.setState({ searchString: null }) : null}
        rightStyle={styles.searchRight}
        rightLabel={
          <Icon.FontAwesome
            name={isEditing ? "close" : "search"}
            size={theme.sizes.base / 1.6}
            color={theme.colors.gray2}
            style={styles.searchIcon}
          />
        }
      />
    </Block>
  )
}

componentDidMount() {
    const { profile } = this.props;
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
    this.setState({ profile: this.props.profile });
    this._FetchDataProduct();
    fetchCategorie().then(data=>{
     this.setState({
        libelleCategorie : data
      })
    })
    this.setState({dummy: 1})

}  
_FetchDataProduct=()=>{
    
    const {page} =this.state

    fetchProduitSimpleObjet(page,this.state.findCategory,this.state.searchString).then((produit)=>{
          let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        this.setState({
          fetchDataSource: ds.cloneWithRows(produit),
          isLoading: false,
          _data:produit,
        
      });

    });
   
}
_fetchMoreProduct() {
    this.setState({
      page: this.state.page + 1
    })
    const {page} =this.state

      fetchProduitSimpleObjet(page,this.state.findCategory,this.state.searchString).then(produit =>{
        const data = this.state._data.concat(produit);
        this.setState({
        fetchDataSource: this.state.fetchDataSource.cloneWithRows(data),
        _data: data, 
         isLoadingMore: false,
      });
   
      }) 
}

renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} primary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
}

render() {
  const { profile, navigation } = this.props;
  const tabs = ['List des produits'];
  const { categories } = this.state;
  if (this.state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Loding  </Text>
       <ActivityIndicator size="small" />
    </View>
    
    );
  } else {
    return (
      console.log(this.state.searchString),
      
    <Block> 
        <Block flex={false} row center space="between" style={styles.header} >
          <Text h1 bold>Accueil</Text>
         { this.renderSearch()}
         {profile.token != null ?
             <Button onPress={() =>navigation.navigate('Settings')}>
             <Image
               source={profile.avatar}
               style={styles.avatar}
             />
             </Button> :
              <Button onPress={() => navigation.navigate('Login')}>
               <Image
               source={profile.avatar}
               style={styles.avatar}
             />
            </Button>
         }
        
        </Block>

      <Block  style={{ paddingHorizontal: theme.sizes.base * 2}} >   

          <ListView
           contentContainerStyle={ styles.list }
            dataSource={this.state.fetchDataSource}
          
            renderRow={item => {
              return (
                <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate('Product', { item })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image 
                     style={{width: 50, height: 50}}
                    source={{uri: BASE_URL+item.icone}} />
                  </Badge>
                  <Text medium height={20}>{item.name}</Text>
                <Text gray caption>{item.nbrCommentaire} Avis</Text>
                </Card>
              </TouchableOpacity>

                 
              );
            }}
            onEndReached={() =>
              this.setState({ isLoadingMore: true }, () => this.fetchMoreProduct() )}
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={{ flex: 1, padding: 10 }}>
                  <ActivityIndicator size="small" />
                </View>
              );
            }}
          />
        </Block>
        
        {this.renderFooter()}
       
     </Block>
    );
  }
}

handleChange = (value) => {
  this.setState({
    findCategory: value,
    page:0,
    fetchDataSource: null,
    isLoading: true,
    isLoadingMore: false,
    _data: null,

  })
  Alert.alert(
    'Filter',
    'Vous voulez afficher les produits avec la catégories ?',
    [
     
      {
        text: 'Cancel',
        onPress: () =>  {this.setState({ findCategory: -1}) ;  this._FetchDataProduct() } ,
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>{ this._FetchDataProduct() }}
    ],
    {cancelable: false},
  ); 

}
renderFooter() {
 return (
    
    <LinearGradient
      locations={[0.5, 1]}
      style={styles.footer}
      colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
    >
      <Button gradient style={{ width: width / 2 }} >
      <Picker color='black' 
          style={styles.picker} itemStyle={styles.pickerItem}
          selectedValue={this.state.findCategory}
          onValueChange={this.handleChange}
        >
          <Picker.Item   key={-1} label={'All'} value={-1} />
            {
              this.state.libelleCategorie.map( (v)=>{
              return <Picker.Item  key={v.id} label={v.libelle} value={v.id} />
              })
            }  
        </Picker>
    
      </Button>
    </LinearGradient>
     
  )
}

}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Browse;
