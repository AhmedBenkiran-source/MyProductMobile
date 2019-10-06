
import { Dimensions,StyleSheet} from 'react-native'
import { theme } from '../constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    marginTop:50,
    
  },
    product: {
      paddingHorizontal: theme.sizes.base * 2,
      paddingVertical: theme.sizes.padding,
    },
    search: {
      marginTop:15,
      height: theme.sizes.base * 2,
      width: width - theme.sizes.base * 2,
      paddingRight: 20,
      justifyContent: 'center',
    },
    searchInput: {
      fontSize: theme.sizes.caption,
      height: theme.sizes.base * 2.5,
      backgroundColor: 'rgba(142, 142, 147, 0.06)',
      borderColor: 'rgba(142, 142, 147, 0.06)',
      paddingLeft: 10,


    },
    searchRight: {
      top: 0,
      marginVertical: 0,
      backgroundColor: 'transparent'
      
    },
    searchIcon: {
      position: 'absolute',
      right: theme.sizes.base / 1.333,
      top: theme.sizes.base / 1.6,
    },
    tag: {
      borderColor: theme.colors.gray2,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: theme.sizes.base,
      paddingHorizontal: theme.sizes.base,
      paddingVertical: theme.sizes.base / 2.5,
      marginRight: theme.sizes.base * 0.625,
    },
    image: {
      width: width / 3.26,
      height: width / 3.26,
      marginRight: theme.sizes.base,
    },
    more: {
      width: 55,
      height: 55,
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: '#800000',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    item: {
      padding: 10,
    },
    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },  
  })

  export {styles}