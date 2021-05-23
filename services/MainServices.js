import { apiServices } from '@/utils/request'
import { request } from '~/utils/api'
import env from '~/config/environemnt'

export default {
  getAllMachine() {
    return request('get', `${env.serveConfig.SERVICE_URL}/machine`, {}, true)
    // return apiServices.get('/machine')
  },

  placeOrder({ productId, totalPrice, totalNumber }) {
    return request('post', `${env.serveConfig.SERVICE_URL}/orders/placeOrder`, {
      productId,
      totalPrice,
      totalNumber
    }, true)
    // return apiServices.post('/orders/placeOrder', { productId, totalPrice, totalNumber })
  },

  createMachine({ machineName, location, address }) {
    return request('post', `${env.serveConfig.SERVICE_URL}/machine`, {
      machineName,
      location,
      address
    }, true)
    // return apiServices.post('/machine', { machineName, location, address })
  },

  updateMachine(id, { machineName, location, address }) {
    return request('put', `${env.serveConfig.SERVICE_URL}/machine/${id}`, {
      machineName,
      location,
      address
    }, true)
    // return apiServices.put(`/machine/${id}`, { machineName, location, address })
  },

  createProduct({ productName, price, number, machineId }) {
    return request('post', `${env.serveConfig.SERVICE_URL}/product`, {
      productName,
      price,
      number,
      machineId
    }, true)
    // return apiServices.post('/product', { productName, price, number, machineId })
  },

  updateProduct(id, { productName, price, number, machineId }) {
    return request('put', `${env.serveConfig.SERVICE_URL}/product/${id}`, {
      productName,
      price,
      number,
      machineId
    }, true)
    // return apiServices.put(`/product/${id}`, { productName, price, number, machineId })
  },

  checkStock() {
    return request('get', `${env.serveConfig.SERVICE_URL}/product/checkStock`, {}, true)
    // return apiServices.get('/product/checkStock')
  }
}
