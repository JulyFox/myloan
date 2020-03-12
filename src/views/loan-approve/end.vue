<template>
  <div>
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="loan_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="loan_card" label="身份证号码" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" @click="read(row)">查看</el-button>
          <el-button type="danger" @click="pass(row)" :disabled="row.result=='pass' || row.result=='reject'">通过</el-button>
          <el-button type="success" @click="reject(row)" :disabled="row.result=='pass' || row.result=='reject'">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查看详情弹层 -->
    <el-dialog title="贷款审批-查看详情" :visible.sync="dialogInfoVisible">
      <el-form  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="ID" prop="id" >
              <el-input v-model="temp.id" readonly/>
            </el-form-item>
          <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" readonly/>
            </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-input :value="temp.birthday |getDate" readonly/>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input :value="temp.sex |getSex" readonly />
          </el-form-item>
          <el-form-item label="教育程度" prop="education">
            <el-input :value="temp.education |getEducation" readonly />
          </el-form-item>
          <el-form-item label="居住地址" prop="address1">
              <el-input v-model="temp.address1" readonly/>
            </el-form-item>
          <el-form-item label="手机号" prop="mobile_phone">
            <el-input v-model.number="temp.mobile_phone" readonly/>
          </el-form-item>
          <el-form-item label="身份证号" prop="loan_card">
            <el-input v-model="temp.identity_card" readonly/>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogInfoVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
    <!-- 初审通过弹层 -->
    <el-dialog title="提示" :visible.sync="dialogPassVisible" width="30%">
      <span>确定初审通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="passData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拒绝弹层 -->
    <el-dialog title="提示" :visible.sync="dialogPassVisible" width="30%">
      <span>确定拒绝初审通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectData()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  loanApprovefirst,
  loanApprovequery,
  loanApprovefPass,
  loanApprovefReject
} from "@/api/article";
export default {
  data() {
    return {
      lists: [],
      rows: 1, //总数量
      pages: 1, //总页数
      query: {
        pageNo: 1,
        pageSize: 10,
        name: ""
      },
      temp: {
        id:'',
        name:'',
        sex:'',
        birthday:'',
        education:'',
        address1:'',
        mobile_phone:'',
        identity_card:''
      },
      dialogInfoVisible:false,
      dialogPassVisible:false,
      dialogRejectVisible:false,
      formLabelWidth:'120px'
    };
  },
  filters:{
    getDate(type){
      var d = new Date(type);
      var dates = d.getFullYear() + '-' + (d.getMonth()+1) + '-' +d.getDate();
      return dates;
    },
    getSex(type){
      switch(type){
        case 'woman':
          return '女士';
        case 'man':
          return '男士';
        default:
          return type;
      }
    },
    getEducation(type){
      switch (type) {
        case "highschool":
          return "高中";
        case "college":
          return "大学";
        default:
          return type;
      }
    },
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {//获取列表信息
      loanApprovefirst(this.query).then(res=>{
        console.log(res);
        if(res.code == '20000'){
          this.lists = res.data.data.data;
          this.rows = res.data.data.rows;
          this.pages = res.data.data.pages;
        }
      })
    },
    read(row) {//查看详情
      loanApprovequery({id:row.loan_id}).then(res=>{
        this.dialogInfoVisible = true;
        if(res.code == '20000'){
          this.temp = res.data.data;
        }
      })
    },
    pass() {//通过审核

    },
    reject() {//拒绝
      
    }
  }
}
</script>
<style scoped>
</style>