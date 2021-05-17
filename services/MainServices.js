import {apiServices} from "@/utils/request";

export default {
  getAllMachine() {
    return apiServices.get("/machine");
  },

  placeOrder({productId, totalPrice, totalNumber}) {
    return apiServices.post("/orders/placeOrder", {productId, totalPrice, totalNumber})
  },

  createMachine({machineName, location, address}) {
    return apiServices.post("/machine", {machineName, location, address})
  },

  updateMachine(id, {machineName, location, address}) {
    return apiServices.put(`/machine/${id}`, {machineName, location, address});
  },

  createProduct({productName, price, number, machineId}) {
    return apiServices.post("/product", {productName, price, number, machineId})
  },

  updateProduct(id, {productName, price, number, machineId}) {
    return apiServices.put(`/product/${id}`, {productName, price, number, machineId});
  },

  AuthLogin({username, password}) {
    return apiServices.post("/admin/signin", {username, password});
  },

  checkStock() {
    return apiServices.get("/product/checkStock");
  }
};
