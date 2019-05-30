<template>
  <div>
    <nav-bar title="新闻列表"></nav-bar>
    <!-- 图文列表 -->
    <ul class="mui-table-view">
      <li v-for="(news, index) in newsList" :key="index" class="mui-table-view-cell mui-media">
          <a :href="news.link">
            <div class="mui-media-body">
              <h4>{{news.title}}</h4>
              <div class="news-desc">
                <p>
                  发表时间: {{news.ptime}}
                </p>
              </div>
              <img :src="news.imgSrc">
            </div>
          </a>
      </li>
  </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newsList: []
    }
  },
  created () {
    this.$ajax.get('journalismApi')
      .then(res => {
        this.newsList = res.data.data.tech
        this.newsList = this.newsList.concat(res.data.data.auto).concat(res.data.data.money)
        this.newsList.forEach((ele) => {
          ele.imgSrc = ele.picInfo[0].url
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
  .mui-table-view {
    margin-bottom: 50px;
  }
  .mui-table-view a{
    display: block;
  }
  .mui-media-body img {
    display: block;
    width: 100%;
  }
</style>
