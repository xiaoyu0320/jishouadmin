<template>
<div class='conduct'>
  <div class="top">
    <el-input v-model="mobile" placeholder="手机号">
      <template slot="prepend">
        手机号
      </template>
    </el-input>
    <el-button type="primary" size="small" style="margin-left:15px;" @click.native="search">搜索</el-button>
  </div>
  <div style="margin-top: 15px;">
    <span style="margin-right:15px;">总资产：{{count}} USDT</span>
  </div>
  <el-table :data="list" border stripe v-loading="loading" style="margin-top:20px;" height="700">
    <el-table-column
    width="120"
      prop="mobile"
      label="用户"
      >
    </el-table-column>
    <el-table-column
      width="150"
      label="钱包地址"
      >
      <template slot-scope="data">
        <el-popover placement="top-start" width="360" trigger="hover" :content="data.row.pa">
          <div slot="reference">{{maskAddress(data.row.pa)}}</div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      width="120"
      prop="totalCoin"
      label="总充USDT"
      >
    </el-table-column>
    <el-table-column
      prop="cnt"
      label="总冲次数"
      >
    </el-table-column>
    <el-table-column
    width="150"
      prop="usdt_assets"
      label="链上资产USDT"
      >
    </el-table-column>
    <el-table-column
      prop="eth_assets"
      label="链上资产ETH"
      >
    </el-table-column>
    <el-table-column
      width="220"
      prop="lasttime"
      label="最后一次提币时间"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      fixed="right"
      width="300"
      >
      <template slot-scope="data">
        <el-button size="small" type="primary" @click.native="upData(data.row)">更新链上资产</el-button>
        <el-popconfirm
          icon="el-icon-info"
          title="是否回收该用户USDT？"
          iconColor="red"
          @onConfirm="collect(data.row)"
        >
          <el-button size="small" type="primary" slot="reference">收回</el-button>
        </el-popconfirm>
        <el-button size="small" type="primary" @click.native="fuelCharge(data.row)">充燃油费</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :hide-on-single-page="single"
    @current-change="changePage"
    :page-size="15"
    :total="total">
  </el-pagination>
  <fuel :pa="pa" :eth="eth" @close="close" v-if="dialogFuel" />
</div>
</template>

<script>
import * as api from 'api'
export default {
  components: {
    fuel: () => import('@c/finance/fuel')
  },
  data () {
    return {
      total: 1,
      single: true,
      loading: false,
      list: [],
      mobile: '',
      page: 1,
      count: 0,
      dialogFuel: false,
      pa: null,
      eth: null
    }
  },
  methods: {
    // TODO: 更新数据
    upData (item) {
      this.loading = true
      api.updateAssets({ uuid: item.uuid }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getList()
      })
    },
    // TODO: 收回
    collect (item) {
      api.collect({ uuid: item.uuid }).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getList()
      })
    },
    // TODO: 充燃油费
    fuelCharge (item) {
      this.eth = item.eth_assets
      this.pa = item.pa
      this.dialogFuel = true
    },
    close () {
      // TODO: 关闭弹窗同时清空部分数据
      this.pa = null
      this.etc = null
      this.dialogFuel = false
    },
    search () {
      this.page = 1
      this.getList()
    },
    changePage (val) {
      this.page = val
      this.getList()
    },
    getList () {
      const obj = {}
      obj.mobile = this.mobile
      obj.page = this.page
      this.loading = true
      api.assetsList(obj).then(res => {
        this.list = res.data.list
        this.count = res.data.totalCoin
        this.total = res.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
.top{
  display: flex;
  align-items: center
}
</style>
