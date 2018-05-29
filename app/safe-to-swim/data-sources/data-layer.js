// @flow

import * as types from '../constants/action-types';
// const url = 'https://safe-to-swim.herokuapp.com/predict';
// const url = 'http://10.0.0.4:5000/predict';
const url = 'http://10.0.0.9:5000/predict';

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'multipart/form-data'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer' // *client, no-referrer
    })
        .then(response => response.json()); // parses response to JSON
}


export async function upload(dispatch, image) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST'
    };

    options.body = new FormData();
    options.body.append('image', {uri: image.uri, type: 'image/jpeg', name: 'habTest'});

    const rawResponse = await fetch(url, options);
    const content = await rawResponse.json();
    console.log(content);
}

//
// export function uploadPhoto(photo: any) {
//     const url = 'https://safe-to-swim.herokuapp.com/predict';
//     const data = new FormData();
//     // data.append('photo', {
//     //     uri: photo.uri,
//     //     type: 'image/jpeg', // or photo.type
//     //     name: 'testPhotoName'
//     // });
//     upload(url, {
//         file: {
//             uri: photo.uri,
//             type: 'image/jpeg',
//             name: 'testPhoto'
//         }
//     })
//         .then(res => console.log('photo uploaded!'))
//         .catch(error => {
//             console.error(error);
//         });
//     // fetch(url, {
//     //     method: 'post',
//     //     body: data
//     // }).then(res => {
//     //     console.log(res)
//     // }).catch(error => console.error(error));
// }

export async function getUserStats(dispatch: () => void): void {
    try {
        const value = await AsyncStorage.getItem('@SafeToSwim:key');
        if (value !== null) {
            dispatch({type: types.GET_USER_STATS_SUCCESS, data: value});
        }
    } catch (error) {
        dispatch({type: types.GET_USER_STATS_FAIL});
    }
}


export async function setUserStats(dispatch: () => void, userStats: Object): void {
    try {
        await AsyncStorage.setItem('@SafeToSwim:key', userStats);
        dispatch({type: types.SET_USER_STATS_SUCCESS, data: userStats});
    } catch (error) {
        dispatch({type: types.SET_USER_STATS_FAIL});
    }
}