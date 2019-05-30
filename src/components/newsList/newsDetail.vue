<template>
  <div>
    <nav-bar title="新闻详情"></nav-bar>
    <div class="news-title">
      <h3>新闻标题</h3>
      <div>
        <span>0次点击</span>
        <span>分类: 民生经济</span>
        <span>添加时间: 2018-01-01</span>
      </div>
    </div>
    <div class="news-content">
      新闻明细
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
  .news-title {
    margin-top: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .news-title div {
    text-align: center;
  }
  .news-title h3 {
    margin-bottom: 10px;
    text-align: center;
    color: #0a84f8;
    font-size: 20px;
    font-weight: bold;
  }
  .news-title div {
    text-align: center;
    margin-bottom: 5px;
  }
  .news-title div span {
    margin-right: 20px;
    font-size: 14px;
  }
</style>
