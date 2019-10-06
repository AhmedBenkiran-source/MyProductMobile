import { Dimensions,StyleSheet} from 'react-native'
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
      marginTop:30,
      paddingHorizontal: theme.sizes.base * 2,
      paddingBottom: theme.sizes.base * 2
    },
  
    list: {
        flexDirection: 'row', justifyContent: 'space-between',
           flexWrap: 'wrap'
    },
    container: {  
      flex: 1,  
      alignItems: 'center',  
      justifyContent: 'center',  
  },  
 textStyle:{  
     margin: 24,  
     fontSize: 25,  
     fontWeight: 'bold',  
     textAlign: 'center',  
 },  
 pickerStyle:{  
     height: 150,  
     width: "80%",  
     color: '#344953',  
     justifyContent: 'center',  
 }  ,
     sectionHeader: {
       paddingTop: 2,
       paddingLeft: 10,
       paddingRight: 10,
       paddingBottom: 2,
       fontSize: 14,
       fontWeight: 'bold',
       backgroundColor: 'rgba(247,247,247,1.0)',
     },
     item: {
       padding: 10,
       fontSize: 18,
       height: 44,
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
    picker: {
      borderColor: 'black',
      borderWidth: 1,
    },
    pickerItem: {
      color: 'red'
    },
    avatar: {
      height: theme.sizes.base * 2.2,
      width: theme.sizes.base * 2.2,
    },
    tabs: {
      borderBottomColor: theme.colors.gray2,
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingLeft: 65,
      paddingRight: 65,
      justifyContent: 'center',
    },
    tab: {
      marginRight: theme.sizes.base * 2,
      paddingBottom: theme.sizes.base
    },
    active: {
      borderBottomColor: theme.colors.secondary,
      borderBottomWidth: 3,
    },
    categories: {
      flexWrap: 'wrap',
      paddingHorizontal: theme.sizes.base * 4,
      marginBottom: theme.sizes.base * 3.5,
    },
    category: {
      // this should be dynamic based on screen width
      minWidth: (width - (theme.sizes.padding * 2.6) - theme.sizes.base) / 2,
      maxWidth: (width - (theme.sizes.padding * 2.6) - theme.sizes.base) / 2,
      maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    }
    
  })
export {styles}  