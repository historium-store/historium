import { defineStore } from 'pinia'
import { useApiStore } from './api'
import router from '../router'
export const useProductStore = defineStore('product', {
  state: () => ({
    api: useApiStore(),
    products: undefined,
    product: undefined,
    sections: undefined,
    homeSpecialSections: {
      novelties: undefined
    }
  }),
  actions: {
    isAvailable(product) {
      return product?.quantity > 0
    },
    async viewProduct(key) {
      await router.push(`/${key}`)
    },
    async loadProducts() {
      console.log('>>> loadProducts')

      const response = await this.api.get('product')
      this.products = response.data
    },
    async loadProduct(key) {
      console.log('>>> loadProduct ' + key)

      const response = await this.api.get(`product/${key}`)
      this.product = response.data
      console.log(this.product)
    },
    async loadSections() {
      console.log('>>> loadSections')

      const response = await this.api.get(`section`)
      this.sections = response.data
    },
    async loadNovelties() {
      console.log('>>> loadNovelties')

      const response = await this.api.get(`product`, false, {
        orderBy: 'createdAt',
        limit: 12
      })
      console.log(response.data)
      this.homeSpecialSections.novelties = response.data
    },
    async loadRecomendations() {
      console.log('>>> loadRecomendations')

      const response = await this.api.get(`product`, false, {
        orderBy: 'createdAt',
        order: 'desc',
        limit: 12
      })
      console.log(response.data)
      this.homeSpecialSections.recomendations = response.data
    },
    useProductMock() {
      this.product = {
        _id: 'none',
        name: 'Назва',
        price: 0,
        quantity: 1,
        type: { _id: 'none', name: 'Книга', key: 'book' },
        sections: [
          {
            _id: 'none',
            name: 'Фантастика та фентезі',
            key: 'fantastyka-ta-fentezi'
          }
        ],
        description: 'Опис',
        images: ['https://m.media-amazon.com/images/I/81cxuKpEabL._AC_UF894,1000_QL80_.jpg'],
        createdAt: 1685304891224,
        updatedAt: 1685704864958,
        code: '000000',
        key: 'novi-temni-viki-kniga-1-koloniya',
        specificProduct: {
          _id: 'none',
          publisher: { _id: 'none', name: 'Автор' },
          languages: ['Мова'],
          publishedIn: 2023,
          authors: [{ _id: 'none', fullName: 'Автор' }],
          compilers: [],
          translators: [],
          illustrators: [],
          editors: [],
          copies: 1,
          isbns: ['999-999-99999-0-1'],
          format: '0х0 мм',
          pages: 1,
          weight: 500,
          paperType: 'Офсетний',
          bindingType: 'Тверда',
          illustrationsType: ['Чорно-білі']
        }
      }
    }
  }
})
