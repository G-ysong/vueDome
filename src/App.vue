<template>
  <div id="app">
    <mt-header title="信息管理系统"></mt-header>
    <transition name="router" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--底部-->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" :to="{name:'home'}">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'member'}">
        <span class="mui-icon icon-diamond"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'shopCart'}">
        <span class="mui-icon icon-gouwucheman">
          <span class="mui-badge">{{buyCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" :to="{name:'search'}">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">查找</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import connect from './components/common/connect'
import shopTools from './components/common/shopCartTools'
export default {
  name: 'App',
  data () {
    return {
      buyCount: shopTools.getShopsCount()
    }
  },
  created () {
    connect.$on('addShopCart', num => {
      this.buyCount = this.buyCount + num
    })
  }
}
</script>

<style>
  .router-enter-active,.router-leave-active {
    transition: opacity .5s;
  }
  .router-enter,.router-leave-to {
    opacity: 0;
  }
</style>
