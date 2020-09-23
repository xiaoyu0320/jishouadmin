<!--  -->
<template>
<div class='census' v-loading="loading">
   <div class="cencus-title">订单统计</div>
   <div class="cencus-list">
      <div class="cencus-item">
         <p>有效订单总数(单):{{info.order_count}}</p>
         <p>支付USDT总量:{{info.usdt_sum}}</p>
         <p>购买质押epc总量:{{info.asc_sum}}</p>
         <p>有效购买人数(人):{{info.order_user_count}}</p>
      </div>
      <div class="cencus-item">
         <p>已退订单总数(单):{{info.refund_count}}</p>
         <p>已退USDT总量:{{info.refund_usdt}}</p>
         <p>已解压epc总量:{{info.refund_asc}}</p>
      </div>
      <div class="cencus-item">
         <p>当日有效订单总数:{{info.today_order_count}}</p>
         <p>单日支付USDT总量:{{info.today_usdt_sum}}</p>
         <p>当日购买质押epc总量:{{info.today_asc_sum}}</p>
      </div>
   </div>
   <div class="cencus-title">算力和升级质押统计</div>
   <div class="wrap">
      <div class="top">
         <div class="item">矿场总算力:{{power}}(Gh/s)</div>
         <div class="item">在线总算力:{{info.online_power}}(Mh/s)</div>
         <div class="item">已出售总算力:{{info.sale_power}}(Mh/s)</div>
         <div class="item">升级质押总量:{{info.all_user_lock}}(epc)</div>
      </div>
      <div class="bottom">
         <div class="head">
            <div class="item">角色</div>
            <div class="item">当前用户数(人)</div>
            <div class="item">当前分配总算力(Mh/s)</div>
            <div class="item">当前自购总算力(Mh/s)</div>
            <div class="item">当前升级质押总量(epc)</div>
         </div>
         <div class="col">
            <div class="item">矿工</div>
            <div class="item">{{info.zero_miner_user_count}}</div>
            <div class="item">{{info.zero_miner_share_power}}</div>
            <div class="item">{{info.zero_miner_self_power}}</div>
            <div class="item">{{info.zero_level_lock}}</div>
         </div>
         <div class="col">
            <div class="item">共识社区</div>
            <div class="item">{{info.one_miner_user_count}}</div>
            <div class="item">{{info.one_miner_share_power}}</div>
            <div class="item">{{info.one_miner_self_power}}</div>
            <div class="item">{{info.one_level_lock}}</div>
         </div>
         <div class="col">
            <div class="item">信仰社区</div>
            <div class="item">{{info.two_miner_user_count}}</div>
            <div class="item">{{info.two_miner_share_power}}</div>
            <div class="item">{{info.two_miner_self_power}}</div>
            <div class="item">{{info.two_level_lock}}</div>
         </div>
         <div class="col">
            <div class="item">守护社区</div>
            <div class="item">{{info.three_miner_user_count}}</div>
            <div class="item">{{info.three_miner_share_power}}</div>
            <div class="item">{{info.three_miner_self_power}}</div>
            <div class="item">{{info.three_level_lock}}</div>
         </div>
         <div class="col">
            <div class="item">联盟社区</div>
            <div class="item">{{info.four_miner_user_count}}</div>
            <div class="item">{{info.four_miner_share_power}}</div>
            <div class="item">{{info.four_miner_self_power}}</div>
            <div class="item">{{info.four_level_lock}}</div>
         </div>
         <div class="total">
            <div class="item">总计</div>
            <div class="item">{{info.all_user_count}}</div>
            <div class="item">{{info.all_miner_share_power}}</div>
            <div class="item">{{info.all_miner_self_power}}</div>
            <div class="item">{{info.all_level_lock}}</div>
         </div>
      </div>
   </div>
   <div class="cencus-title">挖矿统计</div>
   <div class="wrap">
      <div class="top">
         <div class="item">总挖矿:{{info.all_mine}}(epc)</div>
         <div class="item">今日挖矿:{{info.today_all_mine}}(epc)</div>
         <div class="item">用户总拨出:{{info.all_user_mine}}(epc)</div>
      </div>
      <div class="bottom">
         <div class="head">
            <div class="item">角色</div>
            <div class="item">今日已拨(epc)</div>
            <div class="item">昨日已拨(epc)</div>
            <div class="item">已拨总量-自购(epc)</div>
            <div class="item">已拨总量-分配(epc)</div>
         </div>
         <div class="col">
            <div class="item">矿工</div>
            <div class="item">{{info.today_done_5}}</div>
            <div class="item">{{info.yesterday_done_5}}</div>
            <div class="item">{{info.self_done_5}}</div>
            <div class="item">{{info.share_done_5}}</div>
         </div>
         <div class="col">
            <div class="item">共识社区</div>
            <div class="item">{{info.today_done_4}}</div>
            <div class="item">{{info.yesterday_done_4}}</div>
            <div class="item">{{info.self_done_4}}</div>
            <div class="item">{{info.share_done_4}}</div>
         </div>
         <div class="col">
            <div class="item">信仰社区</div>
            <div class="item">{{info.today_done_3}}</div>
            <div class="item">{{info.yesterday_done_3}}</div>
            <div class="item">{{info.self_done_3}}</div>
            <div class="item">{{info.share_done_3}}</div>
         </div>
         <div class="col">
            <div class="item">守护社区</div>
            <div class="item">{{info.today_done_2}}</div>
            <div class="item">{{info.yesterday_done_2}}</div>
            <div class="item">{{info.self_done_2}}</div>
            <div class="item">{{info.share_done_2}}</div>
         </div>
         <div class="col">
            <div class="item">联盟社区</div>
            <div class="item">{{info.today_done_1}}</div>
            <div class="item">{{info.yesterday_done_1}}</div>
            <div class="item">{{info.self_done_1}}</div>
            <div class="item">{{info.share_done_1}}</div>
         </div>
         <div class="col">
            <div class="item">基金会收入</div>
            <div class="item">{{info.today_done_0}}</div>
            <div class="item">{{info.yesterday_done_0}}</div>
            <div class="item">{{info.self_done_0}}</div>
            <div class="item">{{info.share_done_0}}</div>
         </div>
         <div class="col">
            <div class="item">托管</div>
            <div class="item">{{info.today_done_6}}</div>
            <div class="item">{{info.yesterday_done_6}}</div>
            <div class="item">{{info.self_done_6}}</div>
            <div class="item">{{info.share_done_6}}</div>
         </div>
         <div class="total">
            <div class="item">总计</div>
            <div class="item">{{info.all_today_done}}</div>
            <div class="item">{{info.all_yesterday_done}}</div>
            <div class="item">{{info.all_self_done}}</div>
            <div class="item">{{info.all_share_done}}</div>
         </div>
      </div>
   </div>
   <div class="cencus-title">奖励统计</div>
   <div class="wrap">
      <div class="top">
         <div class="item">总奖励:{{info.all_profit}}</div>
         <div class="item">今日总奖励:{{info.today_all_profit}}</div>
         <div class="item">已拨总量:{{info.done_all_profit}}</div>
      </div>
      <div class="bottom">
         <div class="head">
            <div class="item"></div>
            <div class="item">推广奖励(epc)</div>
            <div class="item">业绩奖励(epc)</div>
            <div class="item">社区服务奖励(epc)</div>
            <div class="item">基金收入(epc)</div>
         </div>
         <div class="col">
            <div class="item">今日已拨</div>
            <div class="item">{{info.today_done_profit_2}}</div>
            <div class="item">{{info.today_done_profit_3}}</div>
            <div class="item">{{info.today_done_profit_4}}</div>
            <div class="item">{{info.today_done_profit_5}}</div>
         </div>
         <div class="col">
            <div class="item">昨日已拨</div>
            <div class="item">{{info.yesterday_done_profit_2}}</div>
            <div class="item">{{info.yesterday_done_profit_3}}</div>
            <div class="item">{{info.yesterday_done_profit_4}}</div>
            <div class="item">{{info.yesterday_done_profit_5}}</div>
         </div>
         <div class="col">
            <div class="item">已拨总量</div>
            <div class="item">{{info.profit_2}}</div>
            <div class="item">{{info.profit_3}}</div>
            <div class="item">{{info.profit_4}}</div>
            <div class="item">{{info.profit_5}}</div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { reportSolid } from 'api'
export default {
  components: {},
  data () {
    return {
      info: {},
      loading: false,
      power: '获取中',
      blockList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    getList () {
      this.loading = true
      reportSolid({}).then(res => {
        this.info = res.data
        this.loading = false
      }, () => {
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
@import './common.scss';
</style>
