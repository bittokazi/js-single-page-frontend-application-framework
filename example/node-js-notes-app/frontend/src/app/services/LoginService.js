import { ApiCall } from "./NetworkAdapter";

export function loginUser(data) {
  return ApiCall().public().post(`/login`, data);
}
