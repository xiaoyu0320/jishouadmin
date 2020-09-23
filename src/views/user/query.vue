<!--  -->
<template>
<div class='query' v-loading="loading">
  <div class="search">
    <div class="item">
      <div class="head" style="width: 80px">账号：</div>
      <div class="body" style="width: 150px">
        <el-input placeholder="输入手机号" v-model="mobile" clearable></el-input>
      </div>
    </div>
    <div class="item">
      <div class="head">报名时间：</div>
      <div class="body" style="width: 350px">
        <el-date-picker
          v-model="between_time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </div>
    </div>
    <div class="item">
      <div class="head"></div>
      <div class="body">
        <el-button size="mini" @click="query">查询</el-button>
      </div>
    </div>
  </div>
  <div class="result" v-if="isEmptyObject(info)">
    <div style="padding-bottom: 15px;">查询结果：</div>
    <div class="item fl-wrap">
      <div class="item">
        <div class="head">
          USDT余额/账动：
        </div>
        <div class="body">
          {{info.usdt + ' / ' + info.usdt_movement}}
        </div>
      </div>
      <div class="item">
        <div class="head">epc余额/账动：</div>
        <div class="body">
          {{info.asc + ' / ' + info.asc_movement}}
        </div>
      </div>
      <div class="item">
        <div class="head">当前社区等级：</div>
        <div class="body">
          {{info.level_name}}
        </div>
      </div>
      <div class="item">
        <div class="head">节点用户：</div>
        <div class="body">
          {{info.is_node}}
        </div>
      </div>
      <div class="item">
        <div class="head">线下社区：</div>
        <div class="body">
          {{info.is_community}}
        </div>
      </div>
      <div class="item">
        <div class="head">主/子号报名：</div>
        <div class="body">{{info.enroll_count + '/' + info.child_enroll_count}} 次</div>
      </div>
      <div class="item">
        <div class="head">主/子号拼中：</div>
        <div class="body">{{info.draw_count + '/' + info.child_draw_count}} 次</div>
      </div>
    </div>
    <div class="item fl-wrap">
      <div class="item">
        <div class="head">社区会员主/子号：</div>
        <div class="body">
          {{info.main_account_count + '/' + info.sub_account_count}}人
        </div>
      </div>
      <div class="item">
        <div class="head">伞下报名/有效次数：</div>
        <div class="body">
          {{info.sub_enroll + '/' + info.push_no_draw }}
        </div>
      </div>
      <div class="item">
        <div class="head">伞下拼中：</div>
        <div class="body">
          {{info.sub_draw}} 次
        </div>
      </div>
      <div class="item">
        <div class="head">直推用户昨日报名人数：</div>
        <div class="body">
          {{info.signup_count}}
        </div>
      </div>
      <div class="item">
        <div class="head">直推报名/未拼中次数：</div>
        <div class="body">
          {{info.push_signup_count + '/' + info.push_no_draw_count}}
        </div>
      </div>
    </div>
    <div class="item fl-wrap">
      <div class="item">
        <div class="head">社区总充币：</div>
        <div class="body">
          {{info.usdt_charge_total}}
        </div>
      </div>
      <div class="item">
        <div class="head">社区总提币：</div>
        <div class="body">
          {{info.usdt_extract_total}}
        </div>
      </div>
      <div class="item">
        <div class="head">伞下用户USDT总余额：</div>
        <div class="body">
          {{info.main_account_usdt}}
        </div>
      </div>
      <div class="item">
        <div class="head">伞下用户epc总余额：</div>
        <div class="body">
          {{info.main_account_asc}}
        </div>
      </div>
    </div>
  </div>
  <div v-if="isEmptyObject(info)">
    <el-tabs v-model="query_type" @tab-click="handleClick">
      <el-tab-pane label="伞下用户" name="5"></el-tab-pane>
      <el-tab-pane label="直推用户报名明细" name="6"></el-tab-pane>
      <el-tab-pane label="社区报名明细" name="1"></el-tab-pane>
      <el-tab-pane label="社区中奖明细" name="2"></el-tab-pane>
      <el-tab-pane label="社区总充币明细" name="3"></el-tab-pane>
      <el-tab-pane label="社区总提币明细" name="4"></el-tab-pane>
      <el-tab-pane label="伞下账动异常用户" name="7"></el-tab-pane>
    </el-tabs>
    <el-table v-show="query_type == '1' || query_type == '6'" :data="list" border stripe height="600">
      <el-table-column
        prop="account"
        label="报名账号"
        >
      </el-table-column>
      <el-table-column
        prop="number"
        label="报名编号"
        >
      </el-table-column>
      <el-table-column
        prop="price"
        label="报名费"
        >
      </el-table-column>
      <el-table-column
        prop="status_name"
        label="拼奖状态"
        >
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="报名时间"
        >
      </el-table-column>
    </el-table>
    <el-table v-show="query_type == '2'" :data="list" border stripe height="600">
      <el-table-column
        prop="account"
        label="中奖账号"
        >
      </el-table-column>
      <el-table-column
        prop="number"
        label="中奖编号"
        >
      </el-table-column>
      <el-table-column
        prop="addtime"
        label="中奖时间"
        >
      </el-table-column>
    </el-table>
    <el-table v-show="query_type == '3'" :data="list" border stripe height="600">
      <el-table-column
        prop="mobile"
        label="账号"
        >
      </el-table-column>
      <el-table-column
        prop="hash"
        label="交易哈希"
        >
      </el-table-column>
      <el-table-column
        prop="coin"
        label="交易数量"
        >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="交易时间"
        >
      </el-table-column>
    </el-table>
    <el-table v-show="query_type == '4'" :data="list" border stripe height="600">
      <el-table-column
        prop="mobile"
        label="账号"
        >
      </el-table-column>
      <el-table-column
        prop="hash"
        label="交易哈希"
        >
      </el-table-column>
      <el-table-column
        prop="coin"
        label="交易数量"
        >
      </el-table-column>
      <el-table-column
        prop="service_fee"
        label="手续费"
        >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="交易时间"
        >
      </el-table-column>
    </el-table>
    <el-table v-if="query_type == '5'" :data="list" border stripe height="600" :load="load" row-key="uid" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" lazy >
      <el-table-column
        prop="mobile"
        label="报名账号"
        >
      </el-table-column>
      <el-table-column
        prop="usdt"
        label="USDT余额"
        >
      </el-table-column>
      <el-table-column
        prop="usdt_recharge"
        label="总充USDT"
        >
      </el-table-column>
      <el-table-column
        prop="usdt_withdrawal"
        label="总提USDT"
        >
      </el-table-column>
      <el-table-column
        prop="asc"
        label="epc余额"
        >
      </el-table-column>
      <el-table-column
        prop="asc_recharge"
        label="总充epc"
        >
      </el-table-column>
      <el-table-column
        prop="team_count"
        label="伞下用户"
        >
      </el-table-column>
      <el-table-column
        label="直推/子号用户"
        >
         <template slot-scope="data">
           <div>
             {{data.row.child_count + ' / ' + data.row.sub_account_count}}
           </div>
         </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        >
      </el-table-column>
    </el-table>
    <el-table v-show="query_type == '7'" :data="list" border stripe height="700" show-summary="true">
      <el-table-column
        prop="mobile"
        label="账号"
        >
      </el-table-column>
      <el-table-column
        prop="usdt"
        label="USDT余额"
        >
      </el-table-column>
      <el-table-column
        prop="usdt_movement"
        label="账动统计USDT"
        >
      </el-table-column>
      <el-table-column
        prop="asc"
        label="epc余额"
        >
      </el-table-column>
      <el-table-column
        prop="asc_movement"
        label="账动统计epc"
        >
      </el-table-column>
      <el-table-column
      label="操作"
      width="300"
      >
      <template slot-scope="data">
        <el-button size="small" type="primary" @click.native="check(data.row, 1)">查看USDT明细</el-button>
        <el-button size="small" type="primary" @click.native="check(data.row, 2)">查看epc明细</el-button>
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
  </div>
  <finance v-if="dialog" :icon="type == 1 ? usdt : asc" :totals="type == 1 ? usdtTotal : ascTotal" :uid="uid" :type="type" @close="close"/>
</div>
</template>

<script>
import * as api from 'api'
export default {
  components: {
    finance: () => import('@c/finance/finance')
  },
  data () {
    return {
      mobile: '',
      between_time: '',
      query_type: '5',
      info: {},
      page: 1,
      list: [],
      single: true,
      total: 1,
      loading: false,
      type: '',
      dialog: false,
      uid: '',
      usdtTotal: '',
      ascTotal: '',
      usdt: '',
      asc: ''
    }
  },
  methods: {
    close () {
      this.usdt = ''
      this.asc = ''
      this.usdtTotal = ''
      this.ascTotal = ''
      this.uid = ''
      this.type = ''
      this.dialog = false
    },
    check (item, type) {
      this.usdt = item.usdt
      this.asc = item.asc
      this.usdtTotal = item.usdt_movement
      this.ascTotal = item.asc_movement
      this.uid = item.uid
      this.type = type
      this.dialog = true
    },
    load(tree, treeNode, resolve) {
      let list = []
      api.queryChildList({ uuid: tree.uid }).then(res => {
        const { data } = res
        data.list.map(item => {
          if (Number(item.team_count) > 0) {
            item.hasChildren = true
          }
        })
        list = data.list
        // 加载效果
        setTimeout(() => {
          resolve(list)
        }, 1000)
      })
    },
    changePage (val) {
      this.page = val
      this.getList()
    },
    getList () {
      let time = ''
      if (this.between_time != '' && this.between_time != null) {
        time = this.getstamp(this.between_time[0]) + '-' + this.getstamp(this.between_time[1])
      }
      let obj = {
        mobile: this.mobile,
        between_time: time,
        query_type: this.query_type,
        page: this.page
      }
      this.loading = true
      api.queryDetail(obj).then(res => {
        // TODO: type === '5' 执行，减少额外开支
        if (this.query_type === '5') {
          // 伞下用户大于0时新增属性hasChildren
          res.data.list.map(item => {
            if (Number(item.team_count) > 0) {
              item.hasChildren = true
            }
          })
        }
        this.list = Object.freeze(res.data.list)
        this.total = res.data.count
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleClick(tab, event) {
      this.list = []
      this.getList()
    },
    isEmptyObject (obj) {
      for (let n in obj) {
        return true
      }
      return false
    },
    getstamp (dataTime) {
      var thisTime = this.getstring(dataTime)
      thisTime = thisTime.replace(/-/g, '/')
      var time = new Date(thisTime)
      time = time.getTime() / 1000
      return time
    },
    getstring (dataTime) {
      const d = new Date(dataTime)
      const resDate =
        d.getFullYear() +
        '-' +
        this.p(d.getMonth() + 1) +
        '-' +
        this.p(d.getDate()) + '-' + ' ' +
        this.p(d.getHours()) + ':' +
        this.p(d.getMinutes()) + ':' +
        this.p(d.getSeconds())
      return resDate
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },
    query () {
      let time = ''
      if (this.mobile == '') {
        this.$message.error('请输入手机号')
        return
      }
      if (this.between_time != '' && this.between_time != null) {
        time = this.getstamp(this.between_time[0]) + '-' + this.getstamp(this.between_time[1])
      }
      let obj = {
        mobile: this.mobile,
        between_time: time,
        query_type: this.query_type
      }
      this.loading = true
      api.query(obj).then(res => {
        this.info = res.data
        this.getList()
      }).catch(() => {
        this.loading = true
      })
    }
  },
  created () {
    if (this.$route.query.mobile != undefined) {
      this.mobile = this.$route.query.mobile
      this.query()
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.result{
  border: 1px solid #eeeeee;
  background: #eee;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}
.search{
  display: flex;
}
.item{
  font-size: 12px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .head{
    text-align: right;
    width: 140px;
  }
  .body{
    width: 80px;
    margin-left: 15px;
  }
}
</style>
