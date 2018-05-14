import React from 'react';
import {
    ImageBackground,
    Platform,
    StyleSheet,
    ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    CameraRoll
} from 'react-native';
import { Constants, Camera, FileSystem, Permissions, ImagePicker } from 'expo';
import safeToSwim from '../../assets/images/safe-to-swim.jpg';
import { MonoText } from '../../components/StyledText';
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
                shadowOffset: { height: -3 },
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

    constructor(props: Object) {
        super(props);

        this.state = {
            image: null,
            uploading: false
        };
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ permissionsGranted: status === 'granted' });
    }
    render() {
        let { image } = this.state;
        return (
            <View style={styles.container}>
                {image
                    ? null
                    : (
                        <Text
                            style={{
                                fontSize: 20,
                                marginBottom: 20,
                                textAlign: 'center',
                                marginHorizontal: 15,
                            }}>
                            Example: Upload ImagePicker result
                        </Text>
                    )
                }

                <Button
                    onPress={this._pickImage}
                    title="Pick an image from camera roll"
                />

                <Button onPress={this._takePhoto} title="Take a photo" />

                {this._maybeRenderImage()}
                {this._maybeRenderUploadingOverlay()}

                <StatusBar barStyle="default" />
            </View>

        );
    }
}
    