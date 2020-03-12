<template>
  <div class="system-container" style="height: 100%">
      <div class="system-container-topMsg">
        <span @click="selectSeries=false;selectManufactor=true;" :class="{'select':carFactory}">{{carFactory||'厂家：点击选择'}} <i class="iconfont icon-select" :class="{'select':selectManufactor}"></i> </span>
        <span @click="selectManufactor=false;selectSeries=true;" :class="{'select':carSeries}">{{carSeries||'车系:点击选择'}} <i class="iconfont icon-select" :class="{'select':selectSeries}"></i> </span>
      </div>
    <ul>
      <li @click="selectSystem(item.carModel)" v-for="item in sysList" :key="item.carModel">
        {{item.carModel}}
      </li>
    </ul>
    <div v-transfer-dom>
        <popup v-model="selectManufactor" class="sys-pup-container" position="top" :show-mask="false">
          <div class="sys-pup" @click.stop="selectManufactor=false">
            <div class="select-container" @click.stop="">
              <div class="select-container-item" :class="{'select':carFactory===item.manufactor}" v-for="item in carFactoryList" :key="item.manufactor" @click="selectFactory(item)"><p>{{item.manufactor}}</p></div>
              <span></span>
              <span></span>
            </div>
          </div>
        </popup>
    </div>
    <div v-transfer-dom>
      <popup v-model="selectSeries" class="sys-pup-container" position="top" :show-mask="false">
        <div class="sys-pup" @click.stop="selectSeries=false">
          <div class="select-container" @click.stop="">
            <div class="select-container-item" :class="{'select':carSeries===item.carSeries}" v-for="item in carSeriesList" :key="item.carSeries" @click="selectCarSeries(item)"><p>{{item.carSeries}}</p></div>
            <span></span>
            <span></span>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { queryCarModelOwner, queryCarFactoryListOwner, queryCarSeriesOwner } from '../../../api/carOwner'
import { mapState } from 'vuex'
import { Popup } from 'vux'

export default {
  computed: {
    ...mapState({
      brandData: (state) => state.carModel.brandData
    })
  },
  components: {
    Popup
  },
  data () {
    return {
      selectManufactor: false,
      selectSeries: false,
      carFactory: '', // 车厂
      carSeries: '', // 车系,
      carFactoryList: [],
      carSeriesList: [],
      sysList: []
    }
  },
  methods: {
    selectFactory (item) {
      this.carFactory = item.manufactor
      this.$store.commit('carModel/SET_FACTORY', this.carFactory)
      this.getSeriesList()
      this.selectManufactor = false
      this.getSysList()
    },
    selectCarSeries (item) {
      this.carSeries = item.carSeries
      this.$store.commit('carModel/SET_SERIES', this.carSeries)
      this.selectSeries = false
      this.getSysList()
    },
    selectSystem (sys) {
      this.$store.commit('carModel/SET_SYS', sys)
      this.$emit('sysDone')
    },
    getSysList () {
      this.$vux.loading.show({
        text: '加载中'
      })
      queryCarModelOwner({
        brand: this.$store.state.carModel.brandData.brand,
        carFactory: this.carFactory,
        carSeries: this.carSeries
      }).then(res => {
        this.$vux.loading.hide()
        this.sysList = res.data
      }, err => {
        this.$vux.loading.hide()
      })
    },
    getFactoryList () {
      this.$vux.loading.show({
        text: '加载中'
      })
      queryCarFactoryListOwner({
        brand: this.$store.state.carModel.brandData.brand
      }).then(res => {
        this.$vux.loading.hide()
        this.$store.commit('carModel/SET_FACTORY', '')
        this.carFactoryList = res.data
        if (res.data.length) {
          this.selectFactory(res.data[0])
        }
      })
    },
    getSeriesList () {
      queryCarSeriesOwner({
        brand: this.$store.state.carModel.brandData.brand,
        carFactory: this.carFactory
      }).then(res => {
        this.$store.commit('carModel/SET_SERIES', '')
        this.carSeriesList = res.data
      })
    }
  },
  mounted () {
    this.$store.commit('carModel/SET_SERIES', '')
    this.getFactoryList()
  }
}
</script>
