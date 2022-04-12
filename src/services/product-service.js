// import axios from 'axios'
import { utilService } from './util-service'
import { httpService } from './http-service'
// import { storageService } from './async-storage-service'

const KEY = 'store_db'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
const ENDPOINT = 'product'
// const BASE_URL =
//   process.env.NODE_ENV !== 'development' ? '/api/product' : '//localhost:3030/api/product/'

export const productService = {
  query,
  getById,
  // remove,
  // save,
  // getEmptyProduct,
  getLabels,
}

const gProducts = _createProducts()

async function query(filterBy = {}) {
  return await httpService.get(ENDPOINT, filterBy)
  // return axios.get(BASE_URL, { params: { filterBy } }).then((res) => res.data)
  // return storageService.query(KEY)
}

async function getById(id) {
  return await httpService.get(`${ENDPOINT}/${id}`)
  // return axios.get(BASE_URL + id).then((res) => res.data)
  // return storageService.getById(KEY, id)
}

async function remove(id) {
  return await httpService.delete(`${ENDPOINT}/${id}`)
  // return axios.delete(BASE_URL + id).then((res) => res.data)
  // return storageService.remove(KEY, id)
}

async function save(product) {
  return product._id ? await httpService.put(`${ENDPOINT}/${product._id}`, product) : await httpService.post(ENDPOINT, product)
  // return product._id ? storageService.put(KEY, product) : storageService.post(KEY, product)
}

function getEmptyProduct() {
  return Promise.resolve({
    name: '',
    price: 0,
    labels: [],
    createdAt: new Date(),
    inStock: true,
    // reviews: [],
  })
}

function getLabels() {
  return labels
}

function _createProducts() {
  let products = utilService.loadFromStorage(KEY)
  if (!products || !products.length) {
    products = [_createProduct('Doll', 150, ['On wheels', 'Doll']), _createProduct('Truck', 80, ['Outdoor', 'Baby']), _createProduct('Cards', 150, ['Puzzle', 'Art'])]
    utilService.saveToStorage(KEY, products)
    // 'On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor'
  }
  return products
}

function _createProduct(name, price, labels, reviews) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels,
    inStock: true,
    createdAt: new Date(),
    // reviews: [
    //   { _id: utilService.makeId(), txt: utilService.getLoremIpsum(5), createdAt: new Date() },
    //   { _id: utilService.makeId(), txt: utilService.getLoremIpsum(5), createdAt: new Date() },
    //   { _id: utilService.makeId(), txt: utilService.getLoremIpsum(5), createdAt: new Date() },
    // ],
  }
}
