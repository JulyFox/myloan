<template>
  <div>
    <el-container>
      <el-aside width="200px" class="layout-slide">
          <Slidebar />
      </el-aside>
      <el-container>
        <el-header class="layout-header">
            <Nav />
        </el-header>
        <el-main class="layout-main">
            <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Slidebar from './components/Slidebar'
import Nav from './components/Nav'
import Main from './components/Main'
export default {
    data(){
        return{

        }
    },
    components:{
        Slidebar,
        Nav,
        Main
    }
};
</script>
<style scoped>
.layout-slide{
  position: fixed;
  height: 100%;
  background-color: #545c64;
}
.layout-header{
  margin-left: 200px;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
}
.layout-main{
  margin-left: 200px;
}
</style>