import React, { Component } from 'react'
import { ScrollView, TextInput } from 'react-native'

import { Divider, Button, Block, Text, Switch } from '../components';
import { theme, mocks } from '../constants';
import { fetchEditUser } from '../action/SettingsAction';
import { styles } from '../style/SettingsStyle';
class Settings extends Component {
  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
  }
  static navigationOptions = {
    header: null,

  }
  
  componentDidMount() {
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {

    const { profile } = this.props;
    console.log(profile.username)

    profile[name] = text;
  
console.log(profile)
    this.setState({ profile });
   
    fetchEditUser(profile);
 

  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => this.handleEdit([name], text)}
        />
      )
    }

    return <Text bold>{profile[name]}</Text>
  }

  render() {
    const { profile, editing } = this.state;

    return (
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>Réglages</Text>
          
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>Nom d'utilisateur</Text>
                {this.renderEdit('username')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('username')}>
                {editing === 'username' ? 'Sauvegarder' : 'Modifier'}
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>E-mail</Text>
                {this.renderEdit('email')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('email')}>
                {editing === 'email' ? 'Sauvegarder' : 'Modifier'}
              </Text>
            </Block>
    
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
            <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                <Button gradient onPress={() =>this.handleChange()}>
                  <Text center semibold white>Se déconnecter</Text>
                </Button>
            </Block>


        </ScrollView>
      </Block>
    )
  }

  handleChange() {
    const {  navigation } = this.props;
    const { profile } = this.props;
  
    profile['token'] = null;
    profile['email'] = null;
    profile['username'] = null;
    profile['id'] = null;
    this.setState({ profile }); 
    navigation.navigate('Welcome')

  }
}
Settings.defaultProps = {
  profile: mocks.profile,
}

export default Settings;

