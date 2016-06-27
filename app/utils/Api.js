/**
 * Created by Shrimp on 16/6/26.
 */
var Api = {
    getBio(username = ''){
        username = username.toLowerCase().trim()
        const url = `https://api.github.com/users/${username}`
        return fetch(url).then(r=>r.json());
    },
    getRepos(username = ''){
        username = username.toLowerCase().trim()
        const url = `https://api.github.com/users/${username}/repos`
        return fetch(url).then(r=>r.json());
    },
    getNotes(username = ''){
        username = username.toLowerCase().trim();
        var url = `https://githubnote-server.firebaseio.com/${username}.json`;
        return fetch(url).then(r=>r.json()).then(data=>{
            var arr = [];
            let i = 0;
            for(var n in data){
                arr.push({note:data[n].note,key:i+''});
                i++;
            }
            return arr;
        });
    },
    addNote(username = '',note=''){
        username = username.toLowerCase().trim();
        var url = `https://githubnote-server.firebaseio.com/${username}.json`;
        return fetch(url,{
            method:'post',
            body:JSON.stringify({note})
        }).then(r=>r.json())
    }
}
module.exports = Api