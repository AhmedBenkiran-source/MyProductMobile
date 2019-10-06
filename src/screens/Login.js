import React, { Component } from 'react'
import { Alert,ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { theme, mocks } from '../constants';
import{fetchLogin} from "../action/LoginAction"

import { Button, Block, Input, Text } from '../components';
import { styles} from '../style/LoginStyle';
import { Image } from 'react-native';

const VALID_EMAIL = "ahmed";
const VALID_PASSWORD = "password";


export default class Login extends Component {
  static navigationOptions = {
    header: null,

  }
  
  
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
    profile: {},

  }
  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleLogin() {
    const { navigation } = this.props;
    const { email,token, password } = this.state;
    const errors = [];
    const { profile } = this.props;

    Keyboard.dismiss();
    this.setState({ loading: true });


    this.setState({ errors, loading: false });
          /*  */
   
    fetchLogin(email, password ).then((data)=>{
      if(data.accessToken){
        profile['token'] = data.tokenType + " " + data.accessToken;
        this.setState({ profile });
        navigation.navigate("Browse");
      }else{
        errors.push('email');
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
      }
    
    });
      

  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]} style={styles.header}>
          <Text h1 bold>S'identifier</Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Mot de passe"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>S'identifier</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Mot de passe oublié?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}
Login.defaultProps = {
  profile: mocks.profile,
}
