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
        textAlign: 'center'
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
                <Text style={styles.text}>You have uploaded</Text>
                <Text style={styles.bigText}>{this.props.uploads}</Text>
                <Text style={styles.text}>Photos</Text>
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

