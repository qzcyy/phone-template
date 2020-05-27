<template>
  <div class="mainCon">
    <NavBar />
    <div class="search-res innerCon">
      <van-notice-bar color="#F19D01" background="#FFF8EA" text="请检查识别结果是否与图片数据一致" />
      <div v-if="!vinSearchResult.length" class="vin-no-message">
        <p>暂无该车架号信息，车型数据持续完善中 请用其它方式查询</p>
        <van-button round size="small" @click.stop="checkError('')">纠错</van-button>
      </div>
      <div v-else>
        <van-search
          placeholder="请输入17位车架号查询"
          class="van-search-border"
          shape="round"
          :value="vin"
          @focus="$router.push('/vin/'+vin)"
        />
        <div class="search-res-length">共{{ vinSearchResult.length }}条查询结果</div>
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
              <!--<van-button round size="small" @click.stop="checkError(item)">纠错</van-button>-->
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
import { querySecondCarGroupListByIds } from '@/api/vin'
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
        if (res.length === 1) {
          this.$router.push('/carModel/detail/' + res[0].nLevelIDs)
        }
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
      show: false,
      groupList: []
    }
  }
}
</script>
