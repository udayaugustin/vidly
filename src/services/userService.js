import http from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  const data = {
    email: user.username,
    password: user.password,
    name: user.name,
  };
  return http.post(apiEndPoint, data);
}
