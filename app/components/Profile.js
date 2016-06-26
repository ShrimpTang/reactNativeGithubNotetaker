import React,{Component,PropTypes} from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
ScrollView
}
    from 'react-native'
import Badge from './Badge'
import Separator from './Helpers/Separator'


class Profile extends Component {

    constructor(props){
        super(props)
    }

    makeTitle(title){
        title = title.replace(/_/g,' ');
        return title[0]?title[0].toUpperCase()+title.slice(1):title;
    }

    render(){
        var userInfo = this.props.userInfo;
        var topicArr = ['company','location','followers','following','email','bio','public_repos']
        var list = topicArr.map((item,index)=>{
            if(!userInfo[item]){
                return <View key={index}></View>
            }else{
                return (
                    <View key={index}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.rowTitle}>{this.makeTitle(item)}</Text>
                            <Text style={styles.rowContent}>{userInfo[item]}</Text>
                        </View>
                        <Separator/>
                    </View>
                )
            }
        })
        return (
            <ScrollView style={styles.container}>
                <Badge userInfo={userInfo}/>
                {list}
            </ScrollView>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48BBEC',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }

})