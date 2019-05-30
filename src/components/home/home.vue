<template>
  <div>
    <!-- home轮播图 -->
    <mt-swipe :auto="4000">
      <!--<mt-swipe-item v-for="(img, index) in imgs" :key="index">
        <a :href="img.url"><img :src="img.img"></a>
      </mt-swipe-item>-->
      <mt-swipe-item>
        <a href="#"><img src="../../../static/images/banner01.jpg"></a>
      </mt-swipe-item>
      <mt-swipe-item>
        <a href="#"><img src="../../../static/images/banner02.jpg"></a>
      </mt-swipe-item>
      <mt-swipe-item>
        <a href="#"><img src="../../../static/images/banner03.jpg"></a>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name: 'news.list'}">
          <span class="mui-icon mui-icon-news"></span>
          <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name: 'pic.share'}">
          <span class="mui-icon mui-icon-picShare">
            <!--<span class="mui-badge">5</span>-->
          </span>
          <div class="mui-media-body">美图欣赏</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name: 'pro.list'}">
          <span class="mui-icon mui-icon-goodShow"></span>
          <div class="mui-media-body">小说展示</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
          <span class="mui-icon mui-icon-feedback"></span>
          <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">搜索资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
          <span class="mui-icon mui-icon-callme"></span>
          <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  /*轮播图样式*/
  .mint-swipe{
    width: 100%;
    height: 187px;
    min-height: 187px;
    overflow: hidden;
  }
  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
  /* 九宫格样式 */
  .mui-table-view.mui-grid-view.mui-grid-9{
    background: white;
    margin-top: 0;
  }
  .mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
  }
  .mui-icon-news {
    background: url(../../../static/images/news.png);
  }
  .mui-icon-picShare {
    background: url(../../../static/images/picShare.png);
  }
  .mui-icon-goodShow {
    background: url(../../../static/images/goodShow.png);
  }
  .mui-icon-feedback {
    background: url(../../../static/images/feedback.png);
  }
  .mui-icon-search {
    background: url(../../../static/images/search.png);
  }
  .mui-icon-search::before{
    content: "";
  }
  .mui-icon-callme {
    background: url(../../../static/images/callme.png);
  }
  /* 九宫格大小设置 */
  .mui-icon {
    width: 50px;
    height: 50px;
    -webkit-background-size: cover;
    background-size: cover;
  }
</style>
