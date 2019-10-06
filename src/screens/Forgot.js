import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import {styles} from '../style/ForgotStyle'
const VALID_EMAIL = "contact@react-ui-kit.com";

export default class Forgot extends Component {
  static navigationOptions = {
    header: null,

  }
  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false,
  }

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Password sent!',
        'Please check you email.',
        [
          {
            text: 'OK', onPress: () => {
              navigation.navigate('Login')
            }
          }
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert(
        'Error',
        'Please check you Email address.',
        [
          { text: 'Try again', }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]} style={styles.header}>
          <Text h1 bold>Oublié(e)</Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button gradient onPress={() => this.handleForgot()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Oublié(e)</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
              S'identifier
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

