import React from 'react';
import {
    Platform,
    StyleSheet,
    ActivityIndicator,
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

    static propTypes = {actions: PropTypes.object};

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
        // await Permissions.askAsync(Permissions.CAMERA);
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({permissionsGranted: status === 'granted'});
    }


    upload = (image: Object): () => Object => (
        () => this.props.actions.upload(image)
            .then(results => {
                console.log(results);
            })
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

    maybeRenderImage = image => !image
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
                        source={{uri: image.uri}}
                        style={{
                            height: '90%',
                            width: '90%',
                            shadowColor: 'rgba(0,0,0,1)',
                            shadowOpacity: 0.2,
                            shadowOffset: {width: 4, height: 4},
                            shadowRadius: 5
                        }}
                    />
                </View>
                <View style={styles.toolbar}>
                    <Button
                        onPress={this.upload(image)}
                        title='Upload'
                    />
                    <Button
                        onPress={() => {
                            this.setState({image: null});
                        }}
                        title='Cancel'
                    />
                </View>
            </View>
        );


    render() {
        const {image} = this.state;

        return (
            <View style={styles.container}>
                <StatusBar barStyle='default'/>
                {
                    !image
                        ? (
                            <View style={styles.container}>
                                <Dashboard/>
                                <Button
                                    onPress={this.pickImage}
                                    title='Pick an image from camera roll'
                                />
                            </View>
                        )
                        : this.maybeRenderImage(image)

                }

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
