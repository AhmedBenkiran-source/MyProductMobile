import React, { Component } from 'react'
import { Animated, Dimensions, Image,  ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons';
import { LinearGradient } from 'expo';

import { Button, Input, Block, Text } from '../components';
import { theme, mocks } from '../constants';
import { styles} from "../style/ExploreStyle";
const { width, height } = Dimensions.get('window');

class Explore extends Component {
  static navigationOptions = {
    header: null,

  }
  state = { 
    searchFocus: new Animated.Value(0.6),
    searchString: null,
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
          placeholder="Search"
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

  renderImage(img, index) {
    const { navigation } = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - (theme.sizes.padding * 2.5);
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 1;

    return (
      <TouchableOpacity
        key={`img-${index}`}
        onPress={() => navigation.navigate('Product')}
      >
        <Image
          source={img}
          style={[
            styles.image,
            { minWidth: imgWidth, maxWidth: imgWidth }
          ]}
        />
      </TouchableOpacity>
    )
  }

  renderExplore() {
    const { images, navigation } = this.props;
    const mainImage = images[0];

    return (
      <Block style={{ marginBottom: height / 3 }}>
        <TouchableOpacity
          style={[ styles.image, styles.mainImage ]}
          onPress={() => navigation.navigate('Product')}
        >
          <Image source={mainImage} style={[styles.image, styles.mainImage]} />
        </TouchableOpacity>
        <Block row space="between" wrap>
          {
            images.slice(1).map((img, index) => this.renderImage(img, index))
          }
        </Block>
      </Block>
    )
  }

  renderFooter() {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
      >
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>Filter</Text>
        </Button>
      </LinearGradient>
    )
  }

  render() {
    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>Explore</Text>
          {this.renderSearch()}
        </Block>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderExplore()}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    )
  }
}

Explore.defaultProps = {
  images: mocks.explore,
};

export default Explore;


