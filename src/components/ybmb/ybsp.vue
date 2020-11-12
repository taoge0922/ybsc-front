<template>
  <div class="con_main">
    <div class="con_breadcrumb"><!--标题区-->
      <span style="font-size: 14px;">延保商品维护</span>
    </div>
    <div class="con_sear"><!--查询区-->
      <el-form class="demo-form-inline" :inline="true" :model="searchForm" size="mini" style="margin-top: 10px;">
        <el-form-item>
          <el-input v-model="searchForm.codeAndName" placeholder="模板名称/代码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchTable">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="con_tool"><!--工具栏区域-->
      <el-button type="primary" size="small" @click="toAdd()" icon="el-icon-circle-plus">新增</el-button>
    </div>
    <div class="con_container">
      <el-table
        :data="tableData"
        :row-style="{height:'30px'}"
        :cell-style="{padding:'0px',fontSize: '13px'}"
        :header-cell-style="{padding:'0px',background:'#ebf2f8',color:'#555',fontSize:'13px'}"
        :header-row-style="{height:'30px'}"
        stripe
      >
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="ybcode"
          label="模板代码"
        >
        </el-table-column>
        <el-table-column
          property="ybname"
          label="模板名称"
        >
        </el-table-column>
        <el-table-column
          property="cuser"
          label="创建人"
        >
        </el-table-column>
        <el-table-column
          property="staus"
          label="状态"
        >
          <template  slot-scope="scope">
            <span style="font-size: 13px;" v-if="scope.row.staus+''=='0'">启用</span>
            <span style="font-size: 13px;" v-if="scope.row.staus+''=='1'">停用</span>
          </template>
        </el-table-column>
        <el-table-column
          property="cdate"
          label="创建日期"
          :formatter="dateFormater"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="240">
          <template slot-scope="scope">
            <el-link :underline="false" @click="changeStatus(scope.row)" v-if="scope.row.staus+''=='0'" style="font-size: 13px;margin-left: 8px;" type="primary"  round>停用</el-link>
            <el-link :underline="false" @click="changeStatus(scope.row)" v-if="scope.row.staus+''=='1'" style="font-size: 13px;margin-left: 8px;" type="primary"  round>启用</el-link>
            <el-link :underline="false" @click="deleteMb(scope.row.id)" style="font-size: 13px;margin-left: 8px;" type="success"  round>删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px;margin-left: -10px;"
        :current-page.sync="pageInfo.currentPage"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="pageInfo.total"
        :page-size="pageInfo.pageSize">
      </el-pagination>
    </div>
    <el-drawer
      :visible.sync="drawShow"
      title="延保项目维护"
      :before-close="handleClose"
      class="simpleDrawer"
      ref="drawer"
      size="35%"
      :wrapperClosable="!drawShow">
      <el-tabs tab-position="left" style="height: 100%;font-size: 13px;" class="simpleTab">
        <el-tab-pane label="延保维护">
          <div style="padding-top: 10px;height: 90%;width:98%;">
            <el-form ref="form" :model="ybform" :rules="formrule" label-width="80px" size="mini">
              <el-form-item label="模板编码" prop="ybcode">
                <el-input v-model="ybform.ybcode" ref="ybcode"></el-input>
              </el-form-item>
              <el-form-item label="模板名称" prop="ybname">
                <el-input v-model="ybform.ybname"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="onCancle">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "ybmb",
    mounted(){
      this.searchTable();
    },
    methods:{
      deleteMb(id){
        let that = this;
        this.$confirm('确认删除该条数据？', '提示', {type: 'warning'}).then(() => {
          that.axios.delete("/ybmb/" + id).then(function (res) {
            that.searchTable();
          });
        });
      },
      changeStatus(row) {
        let that = this;
        let paras = {
          id: row.id,
          staus: row.staus
        }
        this.axios.put('/changeStaus', paras).then((res) => {
          if (res.data.code + "" == "0") {
            that.$message({
              message: '修改成功',
              type: 'success'
            });
            that.searchTable();
          } else {
            that.$message({
              message: '修改失败',
              type: 'error'
            });
          }
        });
      },
      onSubmit(){
        let that = this;
        this.$refs.form.validate(function (valid) {
          if (valid) {
            that.axios.post('/ybmb', that.ybform).then((res) => {
              if (res.data.code + "" == "0") {
                that.$message({
                  message: '保存成功',
                  type: 'success'
                });
                that.drawShow = false;
                that.searchTable();
              } else {
                that.$message({
                  message: res.data.message,
                  type: 'error'
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      handleCurrentChange(page){
        this.pageInfo.currentPage=page;
        this.searchTable();//重新加载列表
      },
      searchTable(){
        let size = this.pageInfo.size;
        let current = this.pageInfo.currentPage;
        let queryPars = {
          'current': current,
          'size': size,
          'codeOrName': this.searchForm.codeAndName
        };
        let that = this;
        this.axios.get("/mbpage", {
          params: queryPars
        }).then(res => {
          that.tableData = res.data.retData.records;
          that.pageInfo.total = res.data.retData.total * 1;
        });
      },
      onCancle(){
        this.drawShow = false;
      },
      toAdd(){
        this.ybform = {};
        this.drawShow = true;
        this.$refs['ybcode'].focus();
      },
      handleClose(done) {
        done();
      },
      dateFormater(row, column) {//日期格式化
        var timestamp = row[column.property]
        if (timestamp == null || timestamp == undefined || timestamp == "") return "";
        else {
          var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-'
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          var D = date.getDate() < 10 ? '0' + date.getDate() + " " : date.getDate() + " "
          var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ":"
          var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ":"
          var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
          return Y + M + D + h + m + s;
        }
      }
    },
    data(){
      return{
        ybform:{},
        drawShow:false,
        searchForm:{},
        pageInfo:{
          currentPage:1,
          total:0,
          pageSize:10
        },
        tableData:[],
        formrule: {
          ybcode: [{required: true, message:'不能为空', trigger: 'blur'}],
          ybname: [{required: true, message:'不能为空', trigger: 'blur'}]
        },
      }
    }
  }
</script>

<style scoped>
</style>
