import {
  getToken,
  getUserFromToken,
  removeToken,
  setToken,
} from "./tokenService";

const BASE_URL = "/api/users/";

export function signup(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    body: user,
  })
    .then((res) => {
      if (res.ok) return res.json();
      console.log(
        "if you have encountered an error, check the server terminal"
      );
      throw new Error("Email is already in use.");
    })
    .then(({ token }) => setToken(token));
}

export function getUser() {
  return getUserFromToken();
}

export function logout() {
  removeToken();
}

export function login(creds) {
  return fetch(BASE_URL + "login", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(creds),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Those Credentials are not valid, try again please.");
    })
    .then(({ token }) => setToken(token));
}

export function getProfile(username) {
  return fetch(BASE_URL + username, {
    headers: {
      Authorization: "Bearer" + getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    if (res.status === 404)
      throw new Error(
        "Somebody must've cast wish because that user doesn't exist"
      );
    throw new Error("Those Credentials are not valid, try again please");
  });
}

export function updateBio(bio) {
  return fetch(BASE_URL + "updateBio", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }),
    body: JSON.stringify({ bio }),
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(
      "Those credentials are not working, try once more if you will."
    );
  });
}
