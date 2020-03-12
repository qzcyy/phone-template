<template>
  <div class="modelSelect-container">
    <div class="modelSelect-container-main">
      <h5>排量</h5>
      <div class="displacement-container">
        <span :class="{'select':item===displacement}" @click="selectDisplacement(item)" v-for="item in displacementFilter" :key="item">{{item?item:'全部'}}</span>
      </div>
      <div class="modelSelect-container-item" v-for="item in modelList"  @click="selectModel(item)">
        <h4>{{item.modelYear}}年款 {{item.salesName}}</h4>
        <p> <span class="color-orange">{{item.chassisNum||'--'}}</span> | {{item.transmissionDescription||'--'}} | {{item.gearsNum||'--'}}</p>
        <p>{{`${item.productionYear}-${item.discontinuationYear}`}} | {{item.fuelType}} <span class="color-orange">{{item.engineModel}}</span>  | {{item.maxPower}}KW</p>
      </div>
      <div v-if="!modelList.length" style="text-align: center;color: #999999;margin-top: 40px;">暂无匹配车型数据</div>
    </div>
    <div class="modelSelect-container-main-left">
      <span :class="{'select':item===year}" @click="selectYear(item)" v-for="item in yearFilter" :key="item">{{item}}</span>
    </div>
  </div>
</template>
<script>
import { querySearchDicOwner, queryCarModleListOwner } from '../../../api/carOwner'
export default {
  data () {
    return {
      yearFilter: [],
      displacementFilter: [],
      year: '',
      displacement: '',
      modelList: []
    }
  },
  methods: {
    selectModel (item) {
      this.$store.commit('carModel/SET_MODEL', item)
      this.$emit('modelDone')
    },
    selectDisplacement (data) {
      this.displacement = data
      this.getModel()
    },
    selectYear (year) {
      this.year = year
      this.getModel()
    },
    getModel () {
      this.$vux.loading.show({
        text: '加载中'
      })
      queryCarModleListOwner({
        brand: this.$store.state.carModel.brandData.brand,
        carFactory: this.$store.state.carModel.carFactory,
        carSeries: this.$store.state.carModel.carSeries,
        carModel: this.$store.state.carModel.systemData,
        annualMoney: this.year,
        displacement: this.displacement
      }).then(res => {
        this.modelList = res.data
        this.$vux.loading.hide()
      }, err => {
        this.$vux.loading.hide()
      })
    },
    querySearch () {
      this.$vux.loading.show({
        text: '加载中'
      })
      querySearchDicOwner({
        brand: this.$store.state.carModel.brandData.brand,
        carFactory: this.$store.state.carModel.carFactory,
        carSeries: this.$store.state.carModel.carSeries,
        carModel: this.$store.state.carModel.systemData
      }).then(res => {
        res.data['年款'].reverse()
        this.yearFilter = res.data['年款']
        if (this.yearFilter.length) {
          this.year = this.yearFilter[0]
        }
        this.displacementFilter = res.data['排量']
        this.displacementFilter.unshift(this.displacement)
        this.getModel()
      }, err => {
        this.$vux.loading.hide()
      })
    }
  },
  mounted () {
    this.querySearch()
  }
}
</script>
