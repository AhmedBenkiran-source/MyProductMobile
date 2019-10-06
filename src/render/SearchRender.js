
import Icon from 'react-native-vector-icons';
import {  Input, Block } from '../components';
import React, { Component } from 'react'

import { theme } from '../constants';
import {styles} from "../style/BrowseStyle";
import {Animated} from 'react-native'

function handleSearchFocus(status) {
    Animated.timing(
      this.state.searchFocus,
      {
        toValue: status ? 0.8 : 0.6, // status === true, increase flex size
        duration: 150, // ms
      }
    ).start();
  }

function renderSearch() {
    this.state={
        searchString: null,
        searchFocus: new Animated.Value(0.6),

    }
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;
  
    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => handleSearchFocus(true)}
          onBlur={() => handleSearchFocus(false)}
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
export {renderSearch}