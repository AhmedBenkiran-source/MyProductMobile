import React, { Component } from 'react'
import {Animated, Dimensions, Image, StyleSheet, ActivityIndicator,ScrollView,TouchableOpacity,ListView ,View} from 'react-native'
import Icon from 'react-native-vector-icons';
import { Card, Input,Badge, Button, Block,Text } from '../components';

import { theme, mocks } from '../constants';
import{fetchFindUser} from "../action/LoginAction"
import { localstor } from '../constants/LocalStore';
import { fetchProduitSimpleObjet } from '../action/BrowseAction';
import {BASE_URL} from "../constants/api_url"
import {styles} from "../style/BrowseStyle";
import {renderFooter} from '../render/FooterRender';
import {renderSearch} from '../render/SearchRender'
const { width, height } = Dimensions.get('window');

function ProduitsView(data){
    return(
        
        <Block  style={{ paddingHorizontal: theme.sizes.base * 2}} >   

        <ListView
             contentContainerStyle={ styles.list }
            dataSource={data}
        
            renderRow={rowData => {
            return (
                <TouchableOpacity
                key={rowData.id}
                onPress={() => navigation.navigate('Product', { rowData })}
            >
                <Card center middle shadow style={styles.category}>
                <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image 
                    style={{width: 50, height: 50}}
                    source={{uri: BASE_URL+rowData.iconeproduit}} />
                </Badge>
                <Text medium height={20}>{rowData.nameProduit}</Text>
                <Text gray caption>{rowData.nbrCommentaire} Avis</Text>
                </Card>
            </TouchableOpacity>

                
            );
            }}
            onEndReached={() =>
            this.setState({ isLoadingMore: true }, () => this.fetchMore())}
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
        
    );

}
export {ProduitsView}