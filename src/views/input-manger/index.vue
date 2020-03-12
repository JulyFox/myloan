<template>
  <div>
    <div>      
      <el-input placeholder="请输入用户姓名" v-model="query.name" class="manger-input" @input="getList()"></el-input>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div> 
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.birthday |getBirthday}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="education" label="学历" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.education |getEducation}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.sex |getSex}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="申请状态" width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status |statusTypeFilter">{{scope.row.status |getStatus}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" @click="edit(row)">编辑</el-button>
          <el-button type="danger" @click="del(row)">删除</el-button>
          <el-button type="success" @click="submitToApprove(row)">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹层 -->
    <el-dialog title="申请管理-编辑" :visible.sync="dialogEditVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth" v-show="false">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" class="filter-item" placeholder="请选择">
            <el-option
              v-for="item in sexOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除弹层 -->
    <el-dialog title="提示" :visible.sync="dialogDelVisible" width="30%">
      <span>确定删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="delData()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows"
    ></el-pagination>
  </div>
</template>

<script>
import { setToken, getToken, removeToken } from "@/utils/cookie";
import { loanList, loanUpdate, loanDelete, loanSubmit } from "@/api/article";

//性别
const sexOptions = [
  { key: "man", display_name: "男" },
  { key: "woman", display_name: "女" }
];

export default {
  data() {
    return {
      lists: [], //数据
      rows: 1, //总数量
      pages: 1, //总页数
      query: {
        pageNo: 1,
        pageSize: 10,
        name: ""
      },//查询的结果
      form: {
        id:'',
        name: "",
        sex: ""
      },
      sexOptions,
      dialogEditVisible: false,
      dialogDelVisible: false,
      formLabelWidth: "120px"
    };
  },
  filters: {
    getEducation(type) {
      switch (type) {
        case "highschool":
          return "高中";
        case "college":
          return "大学";
        default:
          return type;
      }
    },
    getSex(type) {
      switch (type) {
        case "woman":
          return "女士";
        case "man":
          return "男士";
        default:
          return type;
      }
    },
    getBirthday(type) {
      var d = new Date(type);
      var dates =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return dates;
    },
    getStatus(type) {
      //审核状态
      switch (type) {
        case 0:
          return "进件";
        case 1:
          return "提交审核";
        case 2:
          return "初审通过"; /*  */
        case 3:
          return "初审拒绝";
        case 4:
          return "提交终审";
        case 5:
          return "终审通过";
        case 6:
          return "终审拒绝";
        case 7:
          return "生成合同";
        default:
          return type;
      }
    },
    statusTypeFilter(type) {
      switch (type) {
        case 0:
          return "danger ";
        case 1:
          return "success";
        case 2:
          return "success";
        case 3:
          return "danger";
        case 4:
          return "success";
        case 5:
          return "success";
        case 6:
          return "danger";
        case 7:
          return "info";
        default:
          return type;
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      loanList(this.query).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.lists = res.data.data.data; //展示数据
          this.pages = res.data.data.pages;//总页数
          this.rows = res.data.data.rows;//总条数
        }
      });
    },
    edit(row) {
      this.dialogEditVisible = true; //弹层显示
      this.form = Object.assign({}, row);
    },
    update() {
      loanUpdate(this.form).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.getList();
          this.dialogEditVisible = false; //弹层隐藏
          this.$notify({
            title: "编辑成功",
            message: "编辑成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    del(row) {
      //删除审核
      this.form = Object.assign({}, row); //复制对象
      this.dialogDelVisible = true;
    },
    delData() {
      loanDelete({ id: this.form.id }).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.getList();
          this.dialogDelVisible = false;
          this.$notify({
            title: "删除成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    submitToApprove(row) {
      //提交审核
      loanSubmit({id:row.id}).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.getList(); //重新调用查询接口
          this.$notify({
            title: "提交成功",
            message: "提交成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.query.pageSize = val || this.query.pageSize;
      this.getList(); //重新调用查询接口
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.query.pageNo = val || this.query.pageNo;
      this.getList(); //重新调用查询接口
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manger-input{
  width: 350px;
  margin-bottom: 20px;
}
</style>
