import { ApiCall } from "./NetworkAdapter";

export function addCategory(data) {
  return ApiCall().authorized().post(`/categories`, data);
}

export function getCategories() {
  return ApiCall().authorized().get(`/categories`);
}

export function getCategory(id) {
  return ApiCall().authorized().get(`/categories/${id}`);
}

export function updateCategory(data) {
  return ApiCall().authorized().put(`/categories/${data.id}`, data);
}
