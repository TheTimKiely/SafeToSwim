import React from 'react';
import {
    ImageBackground,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import safeToSwim from '../../assets/images/safe-to-swim.jpg';
import {MonoText} from '../../components/StyledText';
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center'
    },
    contentContainer: {
        paddingTop: 30
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50
    },
    homeScreenFilename: {
        marginVertical: 7
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)'
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center'
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3
            },
            android: {
                elevation: 20
            }
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center'
    },
    navigationFilename: {
        marginTop: 5
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center'
    },
    helpLink: {
        paddingVertical: 15
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7'
    }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
      header: null
  };


  render() {
      return (
          <View style={styles.container}>
              <ImageBackground style={{flex: 1}}
                  source={safeToSwim}
              >
                  <View style={{position: 'absolute', top: 100, left: 0, height: 70, width: '100%', backgroundColor: 'rgba(255,255,255,0.5)', padding: 10}}>
                      <Text style={{textAlign:'center', fontSize: 24, padding: 10}}>Safe to Swim</Text>
                  </View>
                  <View style={styles.tabBarInfoContainer}>
                      <Text style={styles.tabBarInfoText}>Safe to Swim:</Text>
                      <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                          <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
                      </View>
                  </View>
              </ImageBackground>
          </View>

      );
  }
}


