<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
      <a v-link="{ path: '/goods'}">
      商品
      </a>
      </div>
      <div class="tab-item">
       <a v-link="{ path: '/ratings'}">
       评论
      </a>
      </div>
      <div class="tab-item">
        <a v-link="{ path: '/seller'}">
        商家
      </a>
      </div>
    </div>  
    <!--  路由外链 要替换的地方 -->
    <router-view :seller="seller" keep-alive></router-view> 
  </div>
</template>
<script type="text/ecmascript-6">
  import {urlParse} from 'src/common/js/util';
  import header from './components/header/header.vue';
  const ERR_OK = 0;
  // @import from './static/css/1px.css';
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.seller);
        }
      });
    },
    components: {
     'v-header': header
   }
 };
</script>
<style>
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  .tab .tab-item{
    flex: 1;
    text-align: center;
  }
  .tab .tab-item > a{
    display: block;
    color: rgba(77,85,93);
    font-size: 14px;
  }
  .tab .tab-item > a.active{
    color:rgb(240,20,20);
  }
</style>
