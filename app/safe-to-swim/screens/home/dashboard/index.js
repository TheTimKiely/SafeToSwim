import React from 'react';
import PropTypes from 'prop-types';
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
import {Constants, Camera, FileSystem, Permissions, ImagePicker} from 'expo';
import {bindActionCreators} from 'redux';
import * as actions from '../actions';
import {connect} from 'react-redux';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    bigText: {
        fontSize: 50,
        color: '#2e78b7',
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        color: '#2e78b7',
        textAlign: 'justify',
        margin: 10
    },
    warning: {
        fontSize: 20,
        color: '#AA8888',
        textAlign: 'justify',
        margin: 10
    }
});

class Dashboard extends React.Component {


    static propTypes ={
        uploads: PropTypes.number
    }

    constructor(props: Object) {
        super(props);
    }


    render() {


        return (
            <View style={styles.container}>
                <Text style={styles.bigText}>HAB Check</Text>
                <Text style={styles.text}>Upload an image to check for the presence of a harmful bacteria bloom.</Text>
                <Text style={styles.warning}>Warning: This is very beta software. Do not rely on this for an accurate water quality analysis.</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

