import Cookies from 'js-cookie'

const tokenKey = 'Admin-Token';
//存
export function setToken(token){
    return Cookies.set(tokenKey,token);
}
//取
export function getToken(token){
    return Cookies.get(tokenKey);
}
//删除
export function remove(token){
    return Cookies.remove(tokenKey);
}