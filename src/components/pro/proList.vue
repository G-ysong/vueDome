<template>
  <div style="height: 100%">
    <nav-bar title="小说列表"></nav-bar>
    <div class="mui-content" style="background-color:#fff">
      <h5 style="background-color:#efeff4; text-align: center; color: #f00">
        热卖推荐
      </h5>
      <mt-loadmore :auto-fill="isAutoFill" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul class="mui-table-view mui-grid-view">
          <li v-for="(pro, index) in pros" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
            <router-link :to="{name: 'pro.detail', query: {name: pro.bookname}}">
              <h4>书名: {{pro.bookname}}</h4>
              <h5>作者: {{pro.author_name}}</h5>
              <img class="mui-media-object" :src="pro.book_cover">
              <div class="mui-media-body">
                <div class="desc">
                  <div class="sell">
                    <span>￥{{pro.price}}</span>
                    <s>￥188</s>
                  </div>
                  <div class="detail">
                    <div class="hot">
                      热卖中
                    </div>
                    <div style="font-size: 12px;" class="num-click">
                      已售出:{{pro.num_click}}
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pros: [],
      allLoaded: false,
      isAutoFill: false
    }
  },
  created () {
    this.$ajax.get('novelApi')
      .then(res => {
        this.pros = res.data.data
        this.pros.forEach((ele) => {
          ele.price = 88
        })
      })
  },
  methods: {
    loadBottom () {
      this.$ajax.get('novelApi')
        .then(res => {
          this.pros = res.data.data.concat(this.pros)
          if (res.data.data.length !== 4) {
            this.allLoaded = true
          }
          this.pros.forEach((ele) => {
            ele.price = 88
          })
        })
      this.$refs.loadmore.onBottomLoaded()
    }
  }
}
</script>

<style scoped>
  .mui-content {
    width:100%;
    height:570px;
    overflow: auto;
    box-sizing:border-box;
    -webkit-overflow-scrolling: touch;
  }
  .mui-table-view {
    overflow: auto;
    padding: 5px;
    margin-bottom: 50px;
  }
  .mui-table-view li {
    border: 1px solid #ccc;
  }
  .mui-table-view li a h4{
    font-size: 14px;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    height: auto;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell {
    margin: 0;
    padding: 10px;
  }
  .mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
    margin: 0;
  }
  .sell > span {
    float: left;
    color: red;
    text-align: left;
  }
  .detail >.hot {
    color: #f00;
    float: left;
    text-align: left;
    font-size: 15px;
  }
  .detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
  }
  .detail {
    overflow: auto;
  }
</style>
