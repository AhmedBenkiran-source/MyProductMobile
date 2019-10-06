
import { StyleSheet} from 'react-native'
import { theme } from '../constants';


const styles = StyleSheet.create({
  header: {
    marginTop:50,
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,

  },
    avatar: {
      height: theme.sizes.base * 2.2,
      width: theme.sizes.base * 2.2,
    },
    inputs: {
      marginTop: theme.sizes.base * 0.7,
      paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
      alignItems: 'flex-end'
    },
    sliders: {
      marginTop: theme.sizes.base * 0.7,
      paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
      width: theme.sizes.base,
      height: theme.sizes.base,
      borderRadius: theme.sizes.base,
      borderColor: 'white',
      borderWidth: 3,
      backgroundColor: theme.colors.secondary,
    },
    toggles: {
      paddingHorizontal: theme.sizes.base * 2,
    }
  })

  export {styles}
  