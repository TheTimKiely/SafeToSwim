import React from 'react';
import {Button, Image, TouchableHighlight, StyleSheet, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {FileSystem} from 'expo';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';

const pictureSize = 150;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    pictures: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    picture: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        resizeMode: 'contain'
    },
    pictureWrapper: {
        width: pictureSize,
        height: pictureSize,
        margin: 5
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0
    },
    face: {
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0)'
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 2,
        fontSize: 10,
        backgroundColor: 'transparent'
    }

});


class GalleryScreen extends React.Component {

    static propTypes = {
        actions: PropTypes.object,
        onPress: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            faces: {},
            images: {},
            photos: []
        };
    }

    // _mounted = false;

    componentDidMount() {
        FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory }photos`).then(photos => {
            this.setState(
                {
                    photos
                }
            );
        });
    }


    // getImageDimensions = ({width, height}) => {
    //     if (width > height) {
    //         const scaledHeight = pictureSize * height / width;
    //         return {
    //             width: pictureSize,
    //             height: scaledHeight,
    //
    //             scaleX: pictureSize / width,
    //             scaleY: scaledHeight / height,
    //
    //             offsetX: 0,
    //             offsetY: (pictureSize - scaledHeight) / 2
    //         };
    //     }
    //     const scaledWidth = pictureSize * width / height;
    //     return {
    //         width: scaledWidth,
    //         height: pictureSize,
    //
    //         scaleX: scaledWidth / width,
    //         scaleY: pictureSize / height,
    //
    //         offsetX: (pictureSize - scaledWidth) / 2,
    //         offsetY: 0
    //     };
    //
    // };

    upload = (uri: String) => {
        return this.props.actions.upload(
            {uri, name: 'HABTest', type: 'image/jpeg'}
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.props.onPress}
                    title='Back'/>
                <ScrollView contentComponentStyle={{flex: 1}}>
                    <View style={styles.pictures}>
                        {this.state.photos.map((photo, i) => (
                            <TouchableHighlight
                                onPress={() => this.upload(`${FileSystem.documentDirectory}photos/${photo}`)}
                                style={styles.pictureWrapper}
                                key={i}>
                                <Image
                                    style={styles.picture}
                                    source={{
                                        uri: `${FileSystem.documentDirectory}photos/${photo}`
                                    }}
                                />

                            </TouchableHighlight>
                        ))}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


function mapStateToProps(state) {
    // const photos = state.camera.photos;
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);
