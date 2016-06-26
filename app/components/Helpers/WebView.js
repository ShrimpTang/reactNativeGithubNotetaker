import React,{Component} from 'react'
import {
    View,
    StyleSheet,
    WebView
}
    from 'react-native'


class Web extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{uri:this.props.url}}/>
            </View>
        )
    }
}
export default Web;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F6EF',
        flexDirection: 'column'
    }
})