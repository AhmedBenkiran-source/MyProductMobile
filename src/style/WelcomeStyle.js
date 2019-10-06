import { StyleSheet} from 'react-native'
import { theme } from '../constants';


const styles = StyleSheet.create({
    stepsContainer: {
      position: 'absolute',
      bottom: theme.sizes.base * 3,
      right: 0,
      left: 0,
    },
    steps: {
      width: 5,
      height: 5,
      borderRadius: 5,
      marginHorizontal: 2.5,
    },
  })
   
  export {styles}