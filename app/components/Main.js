import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from  'react-native';

import Api from '../utils/Api'
import Dashboard from './Dashboard'

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            error:false,
            isLoading:false
        }

    }

    handleChange(event){
        this.setState({
            username:event.nativeEvent.text
        })
    }

    handleSubmit(){
        this.setState({
            isLoading:true
        })

        Api.getBio(this.state.username)
            .then(res=>{
                if(res.message === 'Not Found'){
                    this.setState({
                        isLoading:false,
                        error:'User not found'
                    })
                }else{
                    this.props.navigator.push({
                        title:res.name || "Select an option",
                        component:Dashboard,
                        passProps:{userInfo:res}
                    });
                    this.setState({
                        username:'',
                        isLoading:false,
                        erro:false
                    })
                }
            })
    }

    render() {
        var error = this.state.error?(<Text>{this.state.error}</Text>):(<View></View>)
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Search for a Github User</Text>
                <TextInput
                    value={this.state.username}
                    style={styles.searchInput}
                    onChange={this.handleChange.bind(this)}
                />
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="white"
                    onPress={this.handleSubmit.bind(this)}
                    >
                    <Text style={styles.buttonText}>SEARCH</Text>
                </TouchableHighlight>
                <ActivityIndicator
                    size="large"
                    color="#FFFFFF"
                    animating={this.state.isLoading}
                />
                {error}
            </View>
        )
    }
}
export default Main

var styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            padding: 30,
            marginTop: 65,
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#48BBEC'
        },
        title: {
            marginBottom: 20,
            fontSize: 25,
            textAlign: 'center',
            color: '#fff'
        },
        searchInput: {
            height: 50,
            padding: 4,
            marginRight: 5,
            fontSize: 23,
            borderWidth: 1,
            borderColor:'white',
            borderRadius: 8,
            color: 'white'
        },
        buttonText: {
            height:18,
            color:'#111',
            alignSelf:'center'
        },
        button:{
            height:45,
            flexDirection:'row',
            backgroundColor:'white',
            borderColor:'white',
            borderWidth:1,
            borderRadius:8,
            marginBottom:10,
            marginTop:10,
            alignSelf:'stretch',
            justifyContent:'center'
        }
    }
)