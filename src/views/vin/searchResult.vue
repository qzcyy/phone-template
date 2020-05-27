<template>
  <div class="mainCon">
    <NavBar />
    <div class="search-res innerCon">
      <van-notice-bar color="#F19D01" background="#FFF8EA" text="请输入VIN码进行查询" />
      <div>
        <van-search
          v-model="value"
          placeholder="请输入17位车架号查询"
          class="van-search-border"
          shape="round"
          @search="onSearch"
        />
        <div class="search-res-list">
          <div v-for="item in vinSearchResult" :key="item.ids" class="search-res-list-item" @click="$router.push({path:'/parts/' + item.ids,query:{name:item.title,nLevelIDs:item.nLevelIDs,vin}})">
            <div class="search-res-list-item-title ">
              {{ item.title }}
            </div>
            <van-icon name="arrow" color="#DDDDDD" />
            <div class="search-res-list-item-msg van-ellipsis">
              <!--{{ item.salesName }}({{ item.productionYear }}-{{ item.discontinuationYear }})-->
            </div>
            <div class="search-res-list-item-btn">
              <van-button round type="info" size="small" @click.stop="toDetail(item)">详情</van-button>
            </div>
          </div>
        </div>
      </div>
      <van-popup v-model="show" style="background: transparent">
        <div class="searchGroup">
          <div class="searchGroup-title">
            请选择车型
          </div>
          <div class="searchGroup-info">
            <van-cell v-for="item in groupList" is-link @click="$router.push('/carModel/detail/'+item.nLevelIDs)">{{ item.value }}</van-cell>
          </div>
        </div>
      </van-popup>
    </div>
  </div>

</template>
<script>
import { querySecondCarGroupListByIds, queryCarModelGroupByVinAggregation } from '@/api/vin'
import '@/styles/vin.scss'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      vinSearchResult: state => state.vin.vinSearchResult,
      vin: state => state.vin.vin
    })
  },
  methods: {
    onSearch(val) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '查询中...'
      })
      queryCarModelGroupByVinAggregation({
        vin: val,
        type: 2
      }).then(res => {
        this.$store.commit('carModel/SET_FIRST_COMPONENT_CODE', '')
        this.$store.commit('carModel/SET_SECOND_COMPONENT_CODE', '')
        this.$store.commit('vin/SET_VIN_SEARCH', res)
        this.$store.commit('vin/SET_VIN', val)
        this.$toast.clear()
        // }
      }, err => {
        this.$toast.clear()
      })
    },
    toDetail(item) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      querySecondCarGroupListByIds({
        ids: item.ids,
        nLevelIDs: item.nLevelIDs
      }).then(res => {
        this.show = true
        this.groupList = res
        this.$toast.clear()
      })
    },
    checkError(item) {
      this.$store.commit('checkError/SET_DETAIL', item)
      this.$router.push('/checkError?type=vin&vin=' + this.vin)
    }
  },
  data() {
    return {
      value: '',
      show: false,
      groupList: []
    }
  }
}
</script>
