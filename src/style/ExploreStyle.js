import { Dimensions,StyleSheet} from 'react-native'
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    header: {
      paddingHorizontal: theme.sizes.base * 2,
      paddingBottom: theme.sizes.base * 2
    },
    search: {
      height: theme.sizes.base * 2,
      width: width - theme.sizes.base * 2,
    },
    searchInput: {
      fontSize: theme.sizes.caption,
      height: theme.sizes.base * 2,
      backgroundColor: 'rgba(142, 142, 147, 0.06)',
      borderColor: 'rgba(142, 142, 147, 0.06)',
      paddingLeft: theme.sizes.base / 1.333,
      paddingRight: theme.sizes.base * 1.5,
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
    explore: {
      marginHorizontal: theme.sizes.padding * 1.25,
    },
    image: {
      minHeight: 100,
      maxHeight: 130,
      maxWidth: width - (theme.sizes.padding * 2.5),
      marginBottom: theme.sizes.base,
      borderRadius: 4,
    },
    mainImage: {
      minWidth: width - (theme.sizes.padding * 2.5),
      minHeight: width - (theme.sizes.padding * 2.5),
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      overflow: 'visible',
      alignItems: 'center',
      justifyContent: 'center',
      height: height * 0.1,
      width,
      paddingBottom: theme.sizes.base * 4,
    }
  })

  export {styles}