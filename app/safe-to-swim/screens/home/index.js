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
    toolbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        backgroundColor: '#EEE',
        paddingRight: 10,
        paddingLeft: 10
    },
    toolbarText: {
        margin: 10, height: 30, fontSize: 20, color: '#42aaf4'
    }
});

class HomeScreen extends React.Component {

    static propTypes = {
        actions: PropTypes.object,
        error: PropTypes.object,
        prediction: PropTypes.string,
        isUploading: PropTypes.bool
    };


    static navigationOptions = {
        title: 'Home'
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

    takePhoto = async () => {
        const pickerResult = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            aspect: [4, 3]
        });
        return this.setState({image: pickerResult});
    };

    maybeRenderImage = (image) => (
        <View style={styles.container}>
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

            </View>
            <View style={{height: 50}}>
                <View style={styles.toolbar}>
                    <TouchableOpacity style={{height: 50}}
                        onPress={() => {
                            this.setState({isUploading: true}, () => this.upload(image));
                        }}
                    >
                        <Text style={styles.toolbarText}>Upload</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{height: 50}}
                        onPress={() => {
                            this.setState({image: null, isUploading: false});
                        }}>
                        <Text style={styles.toolbarText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );


    render() {
        const {image} = this.state;
        const {error, prediction, isUploading} = this.props;

        const getContent = () => {
            switch (true) {
                case isUploading:
                    return (
                        <View
                            style={[
                                StyleSheet.absoluteFill,
                                {
                                    backgroundColor: '#FFF',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            ]}>
                            <ActivityIndicator color='#333' animating={true} size='large'/>
                            <Text style={{fontSize: 30, marginTop: 20}}>Uploading</Text>
                        </View>
                    );
                case Boolean(prediction):
                    const myPrediction = JSON.parse(prediction.replace(/'/g, '"').replace(/True/g, 'true').replace(/False/g, 'false'));
                    return (
                        <View style={styles.container}>
                            <View>
                                <Text style={{fontSize: 30, textAlign:'center', marginBottom: 50}}>{myPrediction.prediction}</Text>
                            </View>
                            <View style={{height: 50}}>
                                <View style={styles.toolbar}>
                                    <TouchableOpacity style={{height: 50, width: '100%', alignItems:'center'}}
                                        onPress={() => this.setState({image: null}, this.props.actions.clearPrediction)}>
                                        <Text style={styles.toolbarText}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
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
                            <View style={{height: 50}}>
                                <View style={styles.toolbar}>
                                    <TouchableOpacity style={{height: 50}}
                                        onPress={this.pickImage}
                                    >
                                        <Text style={styles.toolbarText}>Pick Photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{height: 50}}
                                        onPress={this.takePhoto}
                                    >
                                        <Text style={styles.toolbarText}>Take Photo</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
            }
        };


        return getContent();


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
