import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/home/';
import CameraScreen from '../screens/camera/';
import SettingsScreen from '../screens/settings/';

export default TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Camera: {
        screen: CameraScreen,
    },
    Settings: {
        screen: SettingsScreen,
    },
}, {
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            const { routeName } = navigation.state;
            let iconName;
            switch (routeName) {
                case 'Home':
                    iconName =
                        Platform.OS === 'ios' ?
                        `ios-information-circle${focused ? '' : '-outline'}` :
                        'md-information-circle';
                    break;
                case 'Camera':
                    iconName = Platform.OS === 'ios' ? `ios-camera${focused ? '' : '-outline'}` : 'md-camera';
                    break;
                case 'Settings':
                    iconName =
                        Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
            }
            return ( <
                Ionicons name = { iconName }
                size = { 28 }
                style = {
                    { marginBottom: -3 }
                }
                color = { focused ? Colors.tabIconSelected : Colors.tabIconDefault }
                />
            );
        },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
});