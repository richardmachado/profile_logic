let token = localStorage.getItem("token");
let tokenData = JSON.parse(window.atob(token.split(".")[1]));

export const userID = tokenData.userId;
export const name = tokenData.username;
