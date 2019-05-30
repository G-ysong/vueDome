<template>
  <div>
    <nav-bar title="美图欣赏"></nav-bar>
    <!-- 导航 -->
    <div class="pic-list">
      <mt-loadmore :auto-fill="isAutoFill" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
          <!--<li v-for="img in imgs" :key="img.id">
            <p>创建时间: {{img.createdAt | converDate}}</p>
            <router-link :to="{name: 'pic.detail', params: {id: img.id}}">
              <img v-lazy="img.url">
            </router-link>
          </li>-->
          <li v-for="img in imgs" :key="img.id">
            <p>上传时间: {{img.createdAt | converDate}}</p>
            <div class="img-list">
              <img v-lazy="img.url" preview="1" src="img.url">
            </div>
          </li>
          <li>
            <p style="text-align: center">剩余缩略图如下</p>
            <vue-preview v-lazy="slides.src" class="thumbs" :slides="slides" @close="handleClose">
            </vue-preview>
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
      imgs: [],
      page: 2,
      allLoaded: false,
      isAutoFill: false,
      slides: []
    }
  },
  created () {
    this.$ajax.get('meituApi?page=2')
      .then(res => {
        this.imgs = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    loadBottom () {
      this.$ajax.get('meituApi?page=' + ++this.page)
        .then(res => {
          this.imgs = res.data.data
          this.imgs.forEach(item => {
            let obj = {}
            let img = new Image()
            let _this = this
            img.src = item.url
            img.onload = function () {
              obj.w = img.width
              obj.h = img.height
              obj.src = img.src
              obj.msrc = img.src
              _this.slides.push(obj)
            }
          })
          if (res.data.data.length !== 20) {
            this.allLoaded = true // 禁止下拉
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.$refs.loadmore.onBottomLoaded()
    },
    handleClose () {
      console.log('close event')
    }
  }
}
</script>

<style scoped>
  .pic-header li {
    display: inline-block;
    margin-left: 10px;
    line-height: 20px;
    font-size: 16px;
  }
  .pic-list {
    width:100%;
    height:500px;
    overflow: auto;
    box-sizing:border-box;
    -webkit-overflow-scrolling: touch;
  }
  .pic-list li {
    position: relative;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    overflow: hidden;
  }
  .pic-list li div.img-list{
    display: block;
    width: 100%;
  }
  .pic-list li div.img-list img {
    display: block;
    width: 100%;
  }
  .pic-list li a div {
    position: absolute;
    padding: 10px;
    color: #fff;
    width: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.2);
    bottom: 0;
  }
  .pic-list li a div h4 {
    font-size: 16px;
  }
  .pic-list li a div span {
    font-size: 14px;
    color: #eee
  }
  /* 图片懒加载样式 */
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .pic-list{
    margin-bottom: 50px;
  }
</style>
