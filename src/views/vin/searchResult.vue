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
        <van-search placeholder="请输入17位车架号查询" :value="vin" @focus="$router.push('/vin/'+vin)" />
        <div class="search-res-length">共{{ vinSearchResult.length }}条查询结果</div>
        <div class="search-res-list">
          <div v-for="item in vinSearchResult" :key="item.carmodelId" class="search-res-list-item" @click="$router.push({path:'/parts/' + item.groupId,query:{carmodelId:item.carmodelId,vin}})">
            <div class="search-res-list-item-title van-ellipsis">
              {{ item.manufactor }} {{ item.brand }} {{ item.carModel }} {{ item.modelYear }}款
            </div>
            <van-icon name="arrow" color="#DDDDDD" />
            <div class="search-res-list-item-msg van-ellipsis">
              {{ item.salesName }}({{ item.productionYear }}-{{ item.discontinuationYear }})
            </div>
            <div class="search-res-list-item-btn">
              <van-button round size="small" @click.stop="checkError(item)">纠错</van-button>
              <van-button round type="info" size="small" @click.stop="$router.push('/carModel/detail/'+item.carmodelId)">详情</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
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
    checkError(item) {
      this.$store.commit('checkError/SET_DETAIL', item)
      this.$router.push('/checkError?type=vin&vin=' + this.vin)
    }
  }
}
</script>
