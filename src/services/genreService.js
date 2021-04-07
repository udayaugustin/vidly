import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndPoint = "/genres";

export async function getGenres() {
  return await http.get(apiEndPoint);
}
