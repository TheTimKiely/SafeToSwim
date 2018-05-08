// @flow

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
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
    const url = 'https://safe-to-swim.herokuapp.com/predict';
    const data = new FormData();
    data.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg', // or photo.type
        name: 'testPhotoName'
    });
    fetch(url, {
        method: 'post',
        body: data
    }).then(res => {
        console.log(res)
    }).catch(error => console.error(error));
}