import Mock from 'mockjs'

const NameList = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(Mock.mock({
    name: '@first'
  }))
}
NameList.push({ name: 'mock-Pan' })

export default [
  // username search
  {
    url: '/search/user',
    type: 'get',
    response: config => {
      const { name } = config.query
      const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
      })
      return {
        code: 20000,
        data: { items: mockNameList }
      }
    }
  },

  // transaction list
  {
    url: '/transaction/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 20,
          items: [
            { order_no: 'Partido 01', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'pending' },
            { order_no: 'Partido 02', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'pending' },
            { order_no: 'Partido 03', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 04', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 05', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 06', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 07', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 08', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 09', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 10', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 11', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 12', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 13', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 14', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 15', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 16', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 17', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 18', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 19', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' },
            { order_no: 'Partido 20', timestamp: +Mock.Random.date('T'), username: '@name()', price: '@float(1000, 15000, 0, 2)', status: 'success' }
          ]
        }
      }
    }
  },

  // matches list
  {
    url: '/matches/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 50,
          'items': [
            { name: 'Partido 01', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 02', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 03', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 04', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 05', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 06', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 07', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 08', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 09', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 10', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 11', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 12', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 13', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 14', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 15', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 16', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 17', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 18', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 19', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 20', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 21', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 22', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 23', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 24', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 25', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 26', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 27', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 28', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 29', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 30', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 31', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 32', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 33', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 34', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 35', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 36', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 37', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 38', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 39', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 40', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 41', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 42', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 43', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 44', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 45', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 46', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 47', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 48', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 49', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' },
            { name: 'Partido 50', timestamp: +Mock.Random.date('T'), field: 'Campo ', username: '@name()', link: '#/table/complex-table' }
          ]
        }
      }
    }
  }
]
