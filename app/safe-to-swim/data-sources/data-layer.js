// @flow

function postData(url, photo) {
    // Default options are marked with *
    const data = new FormData();
    data.append('photo', { uri: photo.uri, type: "image/jpeg", name: 'photo' });
    return fetch(url, {
            body: data, // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer' // *client, no-referrer
        })
        .then(response => response.json()); // parses response to JSON
}

export function uploadPhoto(photo: any) {
    postData('https://safe-to-swim.herokuapp.com/predict', photo)
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));
}