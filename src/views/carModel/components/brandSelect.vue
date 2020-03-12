<template>
  <div class="brand-container" ref="content_main" style="overflow-y: scroll;height: 100%" @scroll="onScroll">
    <div class="brand-select" ref="content">
      <template v-for="item in carModelList">
        <div :key="item['首字母']">
          <div class="brand-select-title" :id="item['首字母']+'-model'">
            <h5>{{item['首字母']}}</h5>
          </div>
          <div class="brand-select-wrapper" >
            <a class="brand-select-item" v-for="item2 in item['品牌列表']" @click="selectBrand(item2)" :key="item2.brand">
              <img :src="item2.logo" class="brand-select-item-icon">
              <span>{{item2.brand||item2.name}}</span>
            </a>
          </div>
        </div>
      </template>
      <div class="brand-select-title">
        <h5> </h5>
      </div>
    </div>

    <div class="fast-navigation">
      <a class="fast-navigation-sel" :class="{'select':item.select}" v-for="item in carModelList" :key="item['首字母']" :id="item['首字母']+'-select'" v-scroll-to="{el:`#${item['首字母']}-model`,container:'.brand-container'}">{{item['首字母']}}</a>
    </div>
  </div>
</template>
<script>
import '../../../assets/sass/carOwner.scss'
import { queryAllCarBrandsListOwner } from '../../../api/carOwner'
export default {
  data () {
    return {
      carModelList: []
    }
  },
  methods: {
    selectBrand (data) {
      if (data.name) {
        data = {
          brand: data.name,
          logo: data.logo
        }
      }
      this.$store.commit('carModel/SET_BRAND', data)
      this.$emit('brandDone')
    },
    onScroll (e) {
      let scrollTop = this.$refs.content_main.scrollTop
      this.carModelList.forEach((item, index) => {
        if (scrollTop >= item.top && index < this.carModelList.length && scrollTop < this.carModelList[index + 1].top) {
          item.select = true
        } else {
          item.select = false
        }
      })
    },
    getBrandList () {
      this.$vux.loading.show({
        text: '加载中'
      })
      queryAllCarBrandsListOwner().then(res => {
        let result
        this.$vux.loading.hide()
        result = [{ 首字母: '热', 品牌列表: res.data.hotBrands }].concat(res.data.carBrandList)
        this.carModelList = result
        this.$nextTick(() => {
          let mainTop = this.$refs.content_main.offsetTop
          document.querySelectorAll('.brand-select-title').forEach((el, index) => {
            this.carModelList.forEach((item, index2) => {
              if (el.id.indexOf(item['首字母']) > -1) {
                this.$set(this.carModelList[index2], 'top', el.offsetTop - mainTop)
                this.$set(this.carModelList[index2], 'select', false)
              }
            })
          })
          document.querySelector('.fast-navigation-sel').classList.add('select')
        })
      }, err => {
        this.$vux.loading.hide()
      })
    }
  },
  mounted () {
    this.getBrandList()
  }
}
</script>
