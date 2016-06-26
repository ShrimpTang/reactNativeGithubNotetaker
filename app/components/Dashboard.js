import React,{Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
}
    from 'react-native'

import Profile from './Profile'
import Api from '../utils/Api'
import Repositories from './Repositories'

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    makeBackgroundColor(backgroundColor) {
        return {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1,
            backgroundColor
        }
    }
    goToProfile(){
        this.props.navigator.push({
            title:'Profile Page',
            component:Profile,
            passProps:{userInfo:this.props.userInfo}
        })
    }

    goToRepos(){
        Api.getRepos(this.props.userInfo.login)
            .then(repos=>{
                this.props.navigator.push({
                    title:'Repos Page',
                    component:Repositories,
                    passProps:{userInfo:this.props.userInfo,repos}
                })
            })
    }

    goToNotes(){
        console.log('goToNotes')
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri:this.props.userInfo.avatar_url}} style={styles.image}/>
                <TouchableHighlight
                    style={this.makeBackgroundColor('#80DEEA')}
                    onPress={this.goToProfile.bind(this)}
                    underlayColor="#48BBEC"
                >
                    <Text style={styles.buttonText}>View Profile</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackgroundColor('#26C6DA')}
                    onPress={this.goToRepos.bind(this)}
                    underlayColor="#48BBEC"
                >
                    <Text style={styles.buttonText}>View Repos</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={this.makeBackgroundColor('#00ACC1')}
                    onPress={this.goToNotes.bind(this)}
                    underlayColor="#48BBEC"
                >
                    <Text style={styles.buttonText}>View Notes</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

export default Dashboard


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
    },
    image: {
        height: 350
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
})