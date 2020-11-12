<template>
    <div class="con_main">
      <div class="con_breadcrumb"><!--标题区-->
        <span style="font-size: 14px;">延保商品维护</span>
      </div>
      <div class="con_sear"><!--查询区-->
        <el-form class="demo-form-inline" :inline="true" :model="searchForm" size="mini" style="margin-top: 10px;">
          <el-form-item>
            <el-input v-model="searchForm.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="con_tool"><!--工具栏区域-->
        <el-button type="primary" size="small" icon="el-icon-circle-plus">新增</el-button>
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
            property="modlecode"
            label="模板代码"
            >
          </el-table-column>
          <el-table-column
            property="modlename"
            label="模板名称"
          >
          </el-table-column>
          <el-table-column
            property="cuser"
            label="创建人"
          >
          </el-table-column>
          <el-table-column
            property="status"
            label="状态"
          >
          </el-table-column>
          <el-table-column
            property="cdate"
            label="创建日期"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="240">
            <el-link :underline="false" style="font-size: 13px;margin-left: 8px;" type="primary"  round>维护</el-link>
            <el-link :underline="false" style="font-size: 13px;margin-left: 8px;" type="success"  round>查看</el-link>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px;margin-left: -10px;"
          background
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ybmb",
      data(){
          return{
            searchForm:{},
            tableData:[{modlecode:'CA001',modlename:'换机油',cdate:'2020-07-21',cuser:'admin',status:'已创建'},
                        {modlecode:'CA002',modlename:'保养',cdate:'2020-07-21',cuser:'admin',status:'已创建'}
                        ]
          }
      }
    }
</script>

<style scoped>
</style>
