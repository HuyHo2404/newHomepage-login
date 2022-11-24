
// const checkAccessToken1 = () => {
//     var dateTime = this.getDateTime();
//     var access_token_exp = localStorage.getItem('access_token_exp');
//     if (access_token_exp > dateTime) {
//         console.log("true")
//         return true;
//     }
//     else {
//         console.log("false")
//         return false;
//     }
// }
function getDateTime(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var second = date.getSeconds();
    if (date.getHours() < 10) {
        hour = '0' + hour;
    }
    if (date.getMinutes() < 10) {
        min = '0' + min;
    }
    if (date.getSeconds() < 10) {
        second = '0' + second;
    }
    var current_time = hour + ":" + min + ":" + second;
    var current_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return current_date + " " + current_time;
}
export function checkAccessToken() {
    var dateTime = getDateTime();
    var access_token_exp = localStorage.getItem('access_token_exp');
    if (access_token_exp > dateTime) {
        return true;
    }
    else {
        return false;
    }
}
export function checkRefreshToken() {
    var dateTime = getDateTime();
    var refresh_token_exp = localStorage.getItem('refresh_token_exp');
    if (refresh_token_exp > dateTime) {
        return true;
    }
    else {
        return false;
    }
}