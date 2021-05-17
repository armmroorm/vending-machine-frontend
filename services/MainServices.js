import {apiServices} from "@/utils/request";

export default {
  getAllMachine() {
    return apiServices.get("/machine");
  },

  placeOrder({productId, totalPrice, totalNumber}) {
    return apiServices.post("/orders/placeOrder", {productId, totalPrice, totalNumber})
  },

  AuthLogin({username, password}) {
    return apiServices.post("/admin/signin", {username, password});
  },
};
