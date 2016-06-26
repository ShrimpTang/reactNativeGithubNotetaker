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
    }
}
module.exports = Api