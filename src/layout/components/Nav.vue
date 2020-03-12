<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="Nav-bread">
      <el-breadcrumb-item v-for="(item,i) in items" :key="i">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown class="Nav-right">
      <span class="el-dropdown-link">
        退出
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="loginout()">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data(){
    return {
      items:[]
    }
  },
  methods:{
    getRouter(){
      console.log(this.$route.matched);
      //this.items = this.$route.matched;
      this.items = this.$route.matched.filter(v=>v.meta && v.meta.title);
    },
    loginout(){
      this.$router.push('/login');
    }
  },
  created(){//数据还未加载出来就要调用
    this.getRouter();
  },
  watch: {
    $route(to,from){
      this.getRouter();
    }
  }
};
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.Nav-right{
  float: right;
}
.Nav-bread{
  height: 50px;
  float: left;
  line-height: 50px;
}
</style>