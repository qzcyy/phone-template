<template>
  <div class="mainCon">
    <NavBar />
    <div class="parts innerCon">
      <div class="parts-carMessage">
        <div class="parts-carMessage-line1">
          <img :src="detail.logo">
          <h3>{{ $route.query.name }}</h3>
        </div>
        <div v-if="$route.query.vin" class="parts-carMessage-line2">
          <span class="vin-icon">VIN</span>
          <span class="vin-line">{{ $route.query.vin }}</span>
        </div>
      </div>
      <div class="parts-search">
        <a href="javascript:;" :class="{'selected':selectedTab===1}" @click="selectedTab=1">保养件</a>
        <a href="javascript:;" :class="{'selected':selectedTab===2}" @click="selectedTab=2">变速箱</a>
      </div>
      <div class="parts-info" :class="{'hasVin':$route.query.vin}">
        <maintenance v-show="selectedTab===1" :car-model-group-detail="detail" />
        <transmission v-show="selectedTab===2" />
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

</template>
<script>
import { queryCarModelBynLevelID } from '@/api/carModel'
import maintenance from './components/maintenance.vue'
import transmission from './components/transmission.vue'
import { mapState } from 'vuex'
import '@/styles/parts.scss'
export default {
  components: {
    maintenance,
    transmission,
  },
  computed: {
    ...mapState({
      vinSearchResult: state => state.vin.vinSearchResult,
      vin: state => state.vin.vin
    })
  },
  data() {
    return {
      detail: {},
      selectedTab: 1,
      groupList: [],
      show: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    toDetail() {
      this.show = true
    },
    getDetail() {
      this.groupList = []
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      queryCarModelBynLevelID({
        nLevelIDs: this.$route.query.nLevelID
      }).then(res => {
        this.detail = res
        this.$toast.clear()
      })
    }
  }
}
</script>
