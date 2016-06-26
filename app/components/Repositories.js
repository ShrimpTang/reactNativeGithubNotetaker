import React,{Component,PropTypes} from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
    ScrollView,
    TouchableHighlight
}
    from 'react-native'
import Badge from './Badge'
import Separator from './Helpers/Separator'
import Web from './Helpers/WebView'

class Repositories extends Component {

    openWeb(url) {
        this.props.navigator.push(
            {
                title:'Web View',
                component:Web,
                passProps:{url}
            }
        )
    }

    render() {
        var repos = this.props.repos;
        var list = repos.map((item, index)=> {
            var desc = item.description ? <Text style={styles.description}>{item.description}</Text> : <View/>
            return (
                <View  key={index}>
                    <View>
                        <View style={styles.rowContainer}>
                            <TouchableHighlight
                                underlayColor="transparent"
                                onPress={this.openWeb.bind(this,item.html_url)}
                            >
                                <Text style={styles.name}>{item.name}</Text>
                            </TouchableHighlight>
                            <Text style={styles.stars}>Stars: {item.stargazers_count}</Text>
                            {desc}
                        </View>
                    </View>
                    <Separator/>
                </View>
            )
        })
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={this.props.userInfo}/>
                {list}
            </ScrollView>
        )
    }
}
Repositories.propTypes = {
    repos: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired
}
export default Repositories;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }

})