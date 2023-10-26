export const addTokenCookie = (
    tokenName: string,
    tokenValue: string,
    expireMinutes: number = 30
  ) => {
    //console.log("tokenvalue",tokenValue)
    const expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + expireMinutes * 60 * 1000);
    let expires = "expires=" + expireDate.toUTCString();
    let cookieName: string = tokenName + "=" + tokenValue + ";" + expires + ";";
    document.cookie = cookieName;
  };

export const getCookie = (name: string) => {
    let cookieName = name + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let cookies = decodeCookie.split(";");
    //console.log("cookies array ", cookies);
    for(let i = 0; i <cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(cookieName) == 0) {
          let result = c.substring(cookieName.length, c.length);
          //console.log("Cookie result ", result);
          return result;
        }
      }
}