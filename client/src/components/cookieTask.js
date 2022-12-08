function getCookie(name){
    let cookieArray = document.cookie.split(";");
    let ind = cookieArray.findIndex((val) => {
        let x = val.trim();
        return x.slice(0,x.indexOf("=")) === name;
    })
    if(ind !== -1){
        let main_value = cookieArray[ind].trim();
        let main = main_value.slice(main_value.indexOf("=") + 1);
        return JSON.parse(main);
    }else{
        return undefined;
    }
}
function setCookie(name,val,exp=30){
    const d = new Date();
    d.setTime(d.getTime() + (exp*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    if(navigator.cookieEnabled){
        val = JSON.stringify(val);
        document.cookie = `${name}=${val};${expires};path=/`;
    }else{
        alert("please enable cookie in your browser.");
    }
}
export {getCookie,setCookie};