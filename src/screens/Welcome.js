import React, { Component } from 'react'
import { Animated, Dimensions, Image, FlatList } from 'react-native';

import { Button, Block, Text } from '../components';
import { theme,mocks } from '../constants';
import {styles } from '../style/WelcomeStyle';
const { width, height } = Dimensions.get('window');
import { localstor } from '../constants/LocalStore';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }
  constructor(props){
    super(props)
    const { navigation } = this.props;
    const { profile } = this.props;


    localstor.retrieveItem('user_token').then((result) => {
        if(result != null){
        profile['token'] = result;
        this.setState({ profile }); 
        navigation.navigate('Browse') 
        }  
    });
  
}

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }])
        }
      />
    )
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          )
        })}
      </Block>
    )
  }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Welcome in.
            <Text h1 primary> You Home.</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
          Profitez d'expérience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
        <Button gradient onPress={() => navigation.navigate('Browse')}>
            <Text center semibold white>Démarrer</Text>
          </Button>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>S'identifier</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text gray caption center style={{ textDecorationLine: 'underline' }}>
            S'inscrire
            </Text>
          </Button>
          
        </Block>
      </Block>
    )
  }
}

Welcome.defaultProps = {
  profile: mocks.profile,
  illustrations: [
    { id: 1, source: require('../../assets/images/illustration_1.png') },
    { id: 2, source: require('../../assets/images/illustration_2.png') },
    { id: 3, source: require('../../assets/images/illustration_3.png') },
  ],
};

export default Welcome;
