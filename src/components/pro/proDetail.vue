<template>
  <div>
    <nav-bar title="小说详情"></nav-bar>
    <div class="product-desc">
      <img :src="proInfo.cover" alt="">
      <ul>
        <li>
          <span class="product-desc-span">
              {{proInfo.title}}
          </span>
        </li>
        <li class="price-li">
          市场价：<s>￥188</s>
          销售价：<span>￥88</span>
        </li>
        <li class="number-li">购买数量：
          <span @click="substract">-</span>
          <span>{{num}}</span>
          <span @click="add">+</span>
        </li>
        <li>
          <mt-button type="primary">立即购买</mt-button>
          <mt-button type="danger" @click="addShopCart">加入购物车</mt-button>
        </li>
      </ul>
    </div>
    <transition @after-enter="afterEnter" name="ball">
      <div class="ball" v-if="isShow"></div>
    </transition>
    <div class="product-props">
      <ul>
        <li>小说类别：{{proInfo.tags}}</li>
        <li>商品货号：{{proInfo.authorid}}</li>
        <li>库存情况：999件</li>
        <li>上架时间：2018-05-20</li>
      </ul>
    </div>
    <div class="product-info">
      <h4>内容简介</h4>
      <p>{{proInfo.desc}}</p>
    </div>
  </div>
</template>

<script>
import connect from '../common/connect'
import shopTools from '../common/shopCartTools'
export default {
  name: 'pro-detail',
  data () {
    return {
      proInfo: [],
      num: 1, // 数量
      isShow: false
    }
  },
  created () {
    let bookname = this.$route.query.name
    this.$ajax.get('novelInfoApi?name=' + bookname)
      .then(res => {
        this.proInfo = res.data.data.aladdin
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    add () {
      if (this.num >= 999) return
      this.num++
    },
    substract () {
      if (this.num <= 0) return
      this.num--
    },
    // 添加购物车
    addShopCart () {
      connect.$emit('addShopCart', this.num)
      this.isShow = true // 显示小球
      // 调用工具
      shopTools.addOrUpdate({
        name: this.proInfo.title,
        num: this.num
      })
    },
    // 过渡效果进入以后的行为
    afterEnter () {
      this.isShow = false // 移除小球
    }
  }
}
</script>

<style scoped>
  /* 小球动画 */
  .ball-enter-active {
    animation: bounce-in .3s;
  }
  @keyframes bounce-in{
    0% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(30px, -50px, 0);
    }
    75% {
      transform: translate3d(50px, 0, 0);
    }
    100% {
      transform: translate3d(50px, 300px, 0);
    }
  }
  .product-desc {
    margin-top: 20px;
    text-align: center;
  }
  /*请ulpadding*/

  .outer-swiper ul,
  .product-desc ul,
  .product-props ul,
  .product-info ul {
    padding: 0;
  }
  .product-desc ul li {
    line-height: 30px;
  }
  .product-desc ul li,
  .product-props ul li,
  .product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
  }

  .product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
  }

  .product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  .product-desc ul,
  .product-info ul,
  .product-props ul {
    padding-left: 10px;
  }

  .price-li span {
    color: red;
    font-size: 25px;
  }

  .price-li s {
    margin-right: 16px;
  }
  /* 加减 */
  .number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
  }
  /* 商品参数 */

  .product-props ul >:nth-child(1) {
    text-align: left;
  }

  .product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
  }
  .number-li span {
    text-align: center;
  }

  .number-li >:nth-child(2) {
    width: 40px;
  }

  .ball {
    border-radius: 50%;
    background-color: red;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 520px;
    left: 180px;
    display: inline-block;
    z-index: 9999;
  }
  .product-info {
    padding: 10px;
    margin-bottom: 50px;
  }
  .product-info h4 {
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .product-info p {
    text-indent: 2em;
    padding-top: 10px;
  }
</style>
