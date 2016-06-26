import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
} from 'react-native';

import  Main from './app/components/Main'

class reactNativeGithubNotetaker extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                component: Main,
                title: 'Github Notetaker'
                 }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#111111'
    }
});

AppRegistry.registerComponent('reactNativeGithubNotetaker', () => reactNativeGithubNotetaker);
