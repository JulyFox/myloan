<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="account" label="用户名" width="180"></el-table-column>
    <el-table-column prop="password" label="密码" width="180"></el-table-column>
    <el-table-column prop="reg_time" label="创建时间">
      <template slot-scope="scope">
         <span>{{scope.row.reg_time |getReg_time}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="creator" label="创建者"></el-table-column>
    <el-table-column prop="role_name" label="权限类型">
      <template slot-scope="scope">
        <span>{{ scope.row.role_name | getRole }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {userList} from '@/api/article'
export default {
  data() {
    return {
      tableData: []
    };
  },
  filters:{
    getReg_time(time){
      var d = new Date(time);
      var dates = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() +' '+ d.getHours()+':'+d.getMinutes();
      return dates;
    },
    getRole(type){
      switch(type){
        case 'input':
          return '销售人员';
        case 'approve':
          return '初审人员';
        default:
          return type;
      }
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      userList(this.tableData).then(res=>{
        console.log(res);
        if(res.code == '20000'){
          this.tableData = res.data;
        }      
      })
    }
  }
};
</script>
<style scoped>
</style>