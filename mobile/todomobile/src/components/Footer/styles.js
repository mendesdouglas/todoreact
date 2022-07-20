import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: 70,
        backgroundColor: '#20295f',
        position: 'absolute',
       
        bottom: 0,
        borderTopWidth: 5,
        borderTopColor: '#EE6B26',
        alignItems: 'center',
        
    },
    button: {
        //justifyContent:'center',
        position: 'relative',
        top:-40,
        //zIndex: 1000
    },
    image: {
        width: 80,
        height:80
    },
    text: {
        position: 'relative',
        top: -30,
        color: '#FFF'
    }
    

});

export default styles;