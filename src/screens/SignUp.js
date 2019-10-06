import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import{fetchRegister} from "../action/SignUpAction"
import { styles } from '../style/LoginStyle';
export default class SignUp extends Component {
  state = {
    email: 'ahmed@mail.com',
    username: 'ahmed',
    password: 'password',
    errors: [],
    loading: false,
  }
  static navigationOptions = {
    header: null,

  }
  
  handleSignUp() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    fetchRegister(email,username, password ).then((data)=> {
      console.log(data.success)
      if(data.success === false){
        errors.push('email');
        errors.push('username');
        errors.push('password');
        Alert.alert(
          'Error!',
           data.message,
          [
            {
              text: 'Continue', onPress: () => {
               
              }
            }
          ],
          { cancelable: false }
        )
       
      }else{
        Alert.alert(
          'Succès!',
          'Votre compte a été créé',
          [
            {
              text: 'Continue', onPress: () => {
                navigation.navigate('Login')
              }
            }
          ],
          { cancelable: false }
        )
      }
   
   });
    this.setState({ errors, loading: false });
  
  }
 
  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}  style={styles.header}>
          <Text h1 bold>S'inscrire</Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Nom d'utilisateur"
              error={hasErrors('username')}
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Mot de passe"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>S'inscrire</Text>
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

