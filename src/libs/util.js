import user from './user';
import qs from 'qs';
import ihistory from './history';
import d from 'dayjs';

function getNextPath(path, state) {
    let newPath = path
    if (state) {
        newPath += "?" + qs.stringify(state)
    }
    return newPath
}

export const dayjs = d;

export const history = {
    push(path, state) {
        ihistory.push(getNextPath(path, state))
    },
    replace(path, state) {
        ihistory.replace(getNextPath(path, state))
    },
    go(next) {
        ihistory.go(next)
    }
}

export function parseURLParams(search = ihistory.location.search) {
    return qs.parse(search, { ignoreQueryPrefix: true })
}

export function getToken() {
    return user.getToken();
}

export function setToken(token) {
    user.setToken(token)
}

export function setUserId(id) {
	user.setUserId(id)
}

export function getUserId() {
    return user.getUserId();
}

export function logout() {
	user.clearUser()
	history.replace('/login')
}

export function download(resp, fileName) {
    const url = window.URL.createObjectURL(new Blob([resp]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
}

export default {
    history,
	dayjs,
    parseURLParams,
    setToken,
    getToken,
	setUserId,
    getUserId,
	logout,
    download
}