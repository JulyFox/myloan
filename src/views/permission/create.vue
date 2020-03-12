<template>
  <el-form :model="Form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="Form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="Form.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="Form.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  
  <el-form-item label="权限分配" prop="type">
    <el-radio-group v-model="Form.role_id">
      <el-radio label="2">销售人员</el-radio>
      <el-radio label="3">初审人员</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">创建管理员</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.Form.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.Form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        Form: {
          name: '',
          password: '',          
          checkPass:'',
          role_id:'2'
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' }
          ],
          checkPass:[
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ],
          role_id: [
            { required: true, message: '请选择权限', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var temp = {
              account: this.Form.account,
              password: this.Form.password,
              role_id: this.Form.role_id
            };
            createUser(temp).then(res=>{
              this.$router
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style scoped>

</style>