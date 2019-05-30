let shopCartTools = {}

let store = window.localStorage

let shops = JSON.parse(store.getItem('shops') || '{}')

// 新增或追加
shopCartTools.addOrUpdate = function (p) {
  if (shops[p.name]) {
    shops[p.name] += p.num
  } else {
    shops[p.name] = p.num
  }
  // 保存
  this.saveShop(shops)
}

// 删除
shopCartTools.delete = function (name) {
  delete shops[name]
  // 保存
  this.saveShop(shops)
}
// 获取
shopCartTools.getShops = function () {
  return JSON.parse(store.getItem('shops') || '{}')
}
// 获取总数
shopCartTools.getShopsCount = function () {
  let sum = 0
  for (let name in shops) {
    sum += shops[name]
  }
  return sum
}
// 存储
shopCartTools.saveShop = function (shops) {
  store.setItem('shops', JSON.stringify(shops))
}
export default shopCartTools
