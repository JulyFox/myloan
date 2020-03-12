<template>
  <div>
    <el-input placeholder="请输入用户姓名" v-model="query.name" class="manger-input" @input="getList()"></el-input>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-table :data="lists" style="width: 100%">
      <el-table-column prop="loan_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="loan_card" label="身份证号码" width="180"></el-table-column>
      <el-table-column prop="file_path" label="合同状态" width="180">
        <template slot-scope="{row}">
          <el-tag :type="row.file_path |statusTypeFilter">{{ row.file_path |statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" @click="create(row)" size="mini" :disabled="row.file_path">生成合同</el-button>
          <el-button
            type="danger"
            @click="download(row)"
            :disabled="!row.file_path"
            size="mini"
          >下载合同</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { contractList, contractCreate, contractDown } from "@/api/article";
import { getToken} from '@/utils/cookie'
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
      }
    };
  },
  filters: {
    statusFilter(type) {
      //合同状态
      if (type) {
        return "已生成合同";
      } else {
        return "未生成合同";
      }
    },
    statusTypeFilter(type) {
      //状态样式
      if (type) {
        return "success";
      } else {
        return "primary";
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      //获取列表信息
      contractList(this.query).then(res => {
        console.log(res);
        if (res.code == "20000") {
          this.lists = res.data.data.data;
          this.rows = res.data.data.rows;
          this.pages = res.data.data.pages;
        }
      });
    },
    //生成合同
    create(row) {
      contractCreate({ id: row.id }).then(res => {
        if (res.code == "20000") {
          this.getList(); //调用查询接口
          this.$notify({
            title: "生成合同",
            message: "生成合同提交成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },
    //下载合同
    download(row) {
      contractDown({ id: row.id }).then(res => {
        if (res.code == "20000") {
          this.getList(); //调用查询接口
          this.$notify({
            title: "下载合同",
            message: "下载合同提交成功",
            type: "success",
            duration: 2000
          });
          this.downloadUrlFile(this.url + res.data.url);
        }
      });
    },
    //根据角色token判断是否有下载权限
    downloadUrlFile(url) {
      const xhr = new XMLHttpRequest(); //创建一个xhr对象
      xhr.open("GET", url, true); //启动一个针对url的get请求  open方法并不会真正发送请求，只是启动一个请求以备发送
      xhr.withCredentials = true; //允许携带cookie
      xhr.responseType = "blob"; //响应类型为blob字节流
      xhr.setRequestHeader("token", getToken()); //传入token
      xhr.onload = () => {
        if (xhr.status === 200) {
          var filename = xhr.responseURL.substring(
            xhr.responseURL.lastIndexOf("/") + 1
          );
          this.saveAs(filename, xhr.response);
        }
      };
      xhr.send();
    },
    saveAs(name, data) {
      var urlObject = window.URL; //window对象的url对象是专门用来将blob或者file读取成一个url的
      var export_blob = new Blob([data]); //代表二进制类型的大对象，就是Blob对象是二进制数据
      var save_link = document.createElement("a");
      save_link.href = urlObject.createObjectURL(export_blob);
      //通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
      //download是 HTML5 中<a>标签新增的一个属性，此属性会强制触发下载操作，指示浏览器下载 URL 而不是导航到它，并提示用户将其保存为本地文件
      save_link.download = name;
      save_link.click();
    }
  }
};
</script>
<style scoped>
.manger-input {
  width: 350px;
  margin-bottom: 20px;
}
</style>