import React,{Component,PropTypes} from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
    TextInput,
    ListView,
    TouchableHighlight
}
    from 'react-native'
import Badge from './Badge'
import Separator from './Helpers/Separator'
import Api from '../utils/Api'

class Notes extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            note: '',
            error: '',
            dataSource: this.ds.cloneWithRows(this.props.notes),
        }
    }

    handleSubmit() {
        var note = this.state.note;
        this.setState({
            note: ''
        });
        Api.addNote(this.props.userInfo.login, note)
            .then(r=> {
                Api.getNotes(this.props.userInfo.login)
                    .then(data=> {
                        this.setState({
                            dataSource: this.ds.cloneWithRows(data)
                        })
                    })
            }).catch(err=> {
            this.setState({
                error: err
            })
        })


    }

    handleChange(event) {
        this.setState({
            note: event.nativeEvent.text
        })
    }

    footer() {
        return (
            <View style={styles.footerContainer}>
                <TextInput value={this.state.note}
                           style={styles.searchInput}
                           onChange={this.handleChange.bind(this)}
                           placeholder="New note"/>
                <TouchableHighlight
                    onPress={this.handleSubmit.bind(this)}
                    style={styles.button}
                    underlayColor="#88D4F5"
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <View>
                <View style={styles.rowContainer} key={rowData.key}>
                    <Text>{rowData.note}</Text>
                    <Separator/>
                </View>
            </View>
        )
    }

    render() {
        return ( <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={()=> <Badge userInfo={this.props.userInfo}/>}
                />
                {this.footer()}
            </View>
        )
    }
}

export default Notes;

Notes.propTypes={
    userInfo:PropTypes.object.isRequired,
   // notes:PropTypes.object.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }

});