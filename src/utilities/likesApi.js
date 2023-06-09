import { getToken } from "./tokenService";

const BASE_URL = "/api/";

export function create(id) {
  return fetch(`${BASE_URL}posts/${id}/likes`, {
    method: "POST",
    headers: {
      Authorization: "Bearer" + getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Login first to like something!!");
  });
}

export function removeLike(id) {
  return fetch(`${BASE_URL}likes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer" + getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Login first to unlike something!!");
  });
}
