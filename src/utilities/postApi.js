import { getToken } from "./tokenService";

const BASE_URL = "/api/posts/";

export function create(post) {
  return fetch(BASE_URL, {
    method: "POST",
    body: post,
    headers: {
      Authorization: "Bearer" + getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error("Bad summthin, maybe credentials");
  });
}

export function getAll() {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      authorization: "Bearer" + getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(
      "Something went wrong, maybe make sure your credentials are correct."
    );
  });
}
