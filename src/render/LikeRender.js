
import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons';
import { Text } from '../components';
import { theme } from '../constants';

function renderLike(){
    return(
      <View style={{ flexDirection: 'row'}}>
        <Text   style={[{ width: "25%" }]} gray caption> Votre avis </Text>

        <View  style={[{ width: "15%" }]}>
        <Icon.FontAwesome
                name={"thumbs-up"}
                size={theme.sizes.base * 1.5 }
                color={theme.colors.primary}
                onPress={() => this.setState({ avis: '1' })}
                />:
              
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

  export {renderLike}