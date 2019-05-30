<template>
  <div>
    <nav-bar title="我的购物车"></nav-bar>
    <div class="pay-detail">
      <ul>
        <li v-for="(shops, index) in shopsList" :key="index"  class="p-list">
          <mt-switch v-model="shops.isPicked"></mt-switch>
          <img :src="shops.cover">
          <div class="pay-calc">
            <p v-text="shops.title"></p>
            <div class="calc">
              <span>￥88</span>
              <span @click="sub(index)">-</span>
              <span >{{shops.num}}</span>
              <span @click="add(index)">+</span>
              <a href="javascript:" @click="del(index)">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import shopTools from '../common/shopCartTools'
import connect from '../common/connect'
export default {
  data () {
    return {
      shopsList: [],
      num: 1
    }
  },
  created () {
    let shops = shopTools.getShops()

    // 判断是否还有商品
    if (Object.keys(shops).length === 0) return

    for (let key in shops) {
      let url = 'novelInfoApi?name='
      url += key
      this.$ajax.get(url)
        .then(res => {
          this.shopsList.push(res.data.data.aladdin
          )
          this.shopsList.forEach((ele, index) => {
            if (shops[ele.title]) {
              this.$set(ele, 'num', shops[ele.title])
              this.$set(ele, 'isPicked', true)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  methods: {
    add (i) {
      this.shopsList[i].num++
      connect.$emit('addShopCart', 1)
      shopTools.addOrUpdate({
        name: this.shopsList[i].title,
        num: 1
      })
    },
    sub (i) {
      if (this.shopsList[i].num <= 1) return
      this.shopsList[i].num--
      connect.$emit('addShopCart', -1)
      shopTools.addOrUpdate({
        name: this.shopsList[i].title,
        num: -1
      })
    },
    del (i) {
      // 删除内存
      let shops = this.shopsList[i]
      shopTools.delete(shops.title)
      // 通知购物车下方小球
      connect.$emit('addShopCart', -shops.num)
      // 删除当前内存
      this.shopsList.splice(i, 1)
    }
  },
  computed: {
    payment () {
      let num = 0
      let sum = 0
      this.shopsList.forEach(ele => {
        if (ele.isPicked) {
          // sum += ele.num * ele.price // 因为接口没有价格 所以用定值
          sum += ele.num * 88
          num += ele.num
        }
      })
      return {
        num, sum
      }
    }
  }
}
</script>

<style scoped>
  .pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
  }

  .pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
  }

  .pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
  }

  .pay-detail ul li >:nth-child(1),
  .pay-detail ul li >:nth-child(3) {
    display: inline-block;
  }

  .pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
  }

  .pay-detail ul li >:nth-child(1) {
    line-height: 80px;
  }

  .calc:nth-child(1) {
    color: red;
    font-size: 20px;
  }

  .calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  .calc a {
    margin-left: 20px;
  }

  .show-1,
  .show-2 {
    display: inline-block;
  }

  .show-1,
  .show-2 {
    margin-left: 30px;
  }

  .show-price {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
