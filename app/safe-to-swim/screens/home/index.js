import React from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Button,
    Image,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Permissions, ImagePicker} from 'expo';
import PropTypes from 'prop-types';
import Dashboard from './dashboard';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import {connect} from 'react-redux';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
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
    },
    toolbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50
    }
});

class HomeScreen extends React.Component {

    static propTypes = {
        actions: PropTypes.object,
        error: PropTypes.object,
        prediction: PropTypes.object,
        isUploading: PropTypes.bool
    };


    static navigationOptions = {
        header: null
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            image: null,
            permissionsGranted: false,
            permissionsError: null
        };
    }

    async componentDidMount() {
        // await Permissions.askAsync(Permissions.CAMERA);
        Permissions.askAsync(Permissions.CAMERA_ROLL)
            .then(({status}) => this.setState({permissionsGranted: status === 'granted'}))
            .catch((error) => this.setState({permissionsError: error}));
    }


    upload = (image: Object): () => Object => (
        this.props.actions.upload(
            {uri: `data:image/jpeg;base64, ${image.base64}`, name: 'HABTest', type: 'image/jpeg'}
        )
    );


    // let uploadResponse, uploadResult;
    //
    // try {
    //     this.setState({ uploading: true });
    //
    //     if (!pickerResult.cancelled) {
    //         uploadResponse = await uploadImageAsync(pickerResult.uri);
    //         uploadResult = await uploadResponse.json();
    //         this.setState({ image: uploadResult.location });
    //     }
    // } catch (e) {
    //     console.log({ uploadResponse });
    //     console.log({ uploadResult });
    //     console.log({ e });
    //     alert('Upload failed, sorry :(');
    // } finally {
    //     this.setState({ uploading: false });
    //


    pickImage = async (): Promise => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 3]
        });

        return this.setState({image: pickerResult});
    };

    maybeRenderImage = (image, error) => !image
        ? null
        : (
            <View
                style={styles.container}>
                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        resizeMode={'contain'}
                        source={{uri: `data:image/jpeg;base64,${ image.base64}`}}
                        style={{
                            height: '90%',
                            width: '90%',
                            shadowColor: 'rgba(0,0,0,1)',
                            shadowOpacity: 0.2,
                            shadowOffset: {width: 4, height: 4},
                            shadowRadius: 5
                        }}
                    />
                    <Text>{JSON.stringify(error)}</Text>
                </View>
                <View style={styles.toolbar}>
                    <Button
                        onPress={() => {
                            this.setState({isUploading: true}, () => this.upload(image));
                        }}
                        title='Upload'
                    />
                    <Button
                        onPress={() => {
                            this.setState({image: null, isUploading: false});
                        }}
                        title='Cancel'
                    />
                </View>
            </View>
        );


    render() {
        const {image} = this.state;
        const {error, prediction, isUploading} = this.props;

        const getContent = () => {
            switch (true) {
                case isUploading:
                    return ( <View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        ]}>
                        <ActivityIndicator color='#fff' animating={true} size='large' />
                    </View>);
                case Boolean(prediction):
                    return (<View style={styles.container}>
                        <Text>{JSON.stringify(prediction)}</Text>
                        <Button
                            onPress={() => this.setState({image: null}, this.props.actions.clearPrediction)}
                            title='Continue'
                        />
                    </View>);
                case Boolean(error) :
                    return (<View style={styles.container}>
                        <Text>{JSON.stringify(error)}</Text>
                    </View>);
                case Boolean(image):
                    return this.maybeRenderImage(image, error);
                default:
                    return (
                        <View style={styles.container}>
                            <Dashboard/>
                            <Button
                                onPress={this.pickImage}
                                title='Pick an image from camera roll'
                            />
                        </View>
                    );
            }
        };


        return (
            <View style={styles.container}>
                <StatusBar barStyle='default'/>
                {getContent()}
            </View>
        );
    }
}


function mapStateToProps(state) {
    return {...state.home};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
