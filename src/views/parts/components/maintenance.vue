<template>
  <div class="maintenance">
    <!--<div class="maintenance-search"></div>-->
    <van-tabs v-model="activeTab" color="#3F90F7" @change="changeTab">
      <van-tab v-for="tab in tabs" :key="tab.componentCode" :title="tab.name" :name="tab.componentCode" />
      <van-sidebar v-model="activeSidebar" @change="changeSidebar">
        <van-sidebar-item v-for="sidebar in sidebars" :key="sidebar.componentCode" :title="sidebar.name" />
      </van-sidebar>
    </van-tabs>
    <div class="maintenance-list">
      <div class="maintenance-filter">
        {{ selectedSidebar.name }}
        <van-dropdown-menu>
          <van-dropdown-item v-model="switch1" title="部件详情">
            <div class="maintenance-filter-info">
              <div class="maintenance-filter-item">
                <img v-for="(item,index) in sidebarInfo.listImg" :key="index" :src="item.componentImg" @click="showImgList(sidebarInfo.listImg,index)">
              </div>
              <div class="maintenance-filter-item">
                <h4 class="title-4">OE码</h4>
                <h4 class="info-4">{{ oeInfo }}</h4>
              </div>
              <div class="maintenance-filter-item">
                <h4 class="title-4">其他说明</h4>
                <h4 class="info-4">{{ sidebarInfo&&sidebarInfo.componentProperty&&sidebarInfo.componentProperty.componentProperty }}</h4>
              </div>
            </div>
          </van-dropdown-item>
          <van-dropdown-item ref="item" v-model="switch2" title="品牌筛选">
            <!--<van-switch-cell v-model="switch1" title="包邮" />-->
            <!--<van-switch-cell v-model="switch2" title="团购" />-->
            <div class="maintenance-filter-brand">
              <div v-for="item in brandList" :key="item.brandid" class="maintenance-filter-brand-item" :class="{'selected':item.isSelected}" @click="item.isSelected=!item.isSelected">{{ item.brand }}</div>
            </div>
            <van-button @click="resetBrandFilter">重置</van-button>
            <van-button type="info" @click="doConfirmBrand">确认</van-button>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
      <van-list
        v-model="loading"
        class="maintenance-list-wrapper"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="queryList"
      >
        <div v-for="item in list" :key="item.id" class="maintenance-item van-clearfix" @click="$router.push('/parts/detail/'+item.id)">
          <img :src="item.imgPath || require('../../../assets/pic_def_bj.png')" alt="图片加载失败">
          <div class="right-box">
            <div class="title-4 van-ellipsis">{{ item.brand }} {{ item.name }}</div>
            <span>{{ item.specificationModel }} | {{ item.factoryNumber }}</span>
            <span>备注：{{ item.modelRemark||'--' }}</span>
            <span>车型备注：{{ item.remarks||'--' }}</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import { queryPartsBrands, queryGroupComponentInfo, queryTopComponentList, queryBottomComponentList, queryAllPartsList } from '@/api/parts'
export default {
  data() {
    return {
      activeSidebar: 0,
      activeTab: '',
      tabs: [],
      sidebars: [],
      sidebarInfo: {},
      list: [],
      brandList: [],
      loading: false,
      finished: true,
      searchQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      switch1: false,
      switch2: false
    }
  },
  computed: {
    selectedSidebar() {
      return this.sidebars[this.activeSidebar] || {}
    },
    oeInfo() {
      return Object.keys(this.sidebarInfo).length && this.sidebarInfo.listOe && this.sidebarInfo.listOe.map(item => item.componentOe).join(',')
    }
  },
  mounted() {
    this.queryTabs()
  },
  methods: {
    resetBrandFilter() {
      this.brandList.forEach(item => item.isSelected = false)
    },
    showImgList(urls, index) {
      ImagePreview({
        images: urls.map(item => item.imgPath),
        startPosition: index,
        closeable: true
      })
    },
    changeTab(componentCode) {
      this.sidebarInfo = {}
      this.brandList = []
      this.sidebars = []
      this.list = []
      queryBottomComponentList({
        componentCode
      }).then(res => {
        this.sidebars = res
        const codeIndex = res.findIndex(item => item.componentCode === this.$store.state.carModel.secondcomponentcode)
        this.activeSidebar = codeIndex === -1 ? 0 : codeIndex
        this.changeSidebar()
      })
    },
    changeSidebar() {
      this.list = []
      this.searchQuery.pageIndex = 1
      this.queryList()
      this.querySidebarInfo()
    },
    querySidebarInfo() {
      queryGroupComponentInfo({
        componentCode: this.selectedSidebar.componentCode,
        groupId: this.$route.params.id
      }).then(res => {
        this.sidebarInfo = res
      })
      queryPartsBrands({
        componentCode: this.selectedSidebar.componentCode,
        groupId: this.$route.params.id,
        type: ''
      }).then(res => {
        this.brandList = res.map(item => {
          return {
            ...item,
            isSelected: false
          }
        })
      })
    },
    doConfirmBrand() {
      this.$refs.item.toggle()
      const brandList = this.brandList.filter(item => item.isSelected).map(item => item.brandid).join(',')
      this.list = []
      this.queryList(brandList)
    },
    queryList(brandList) {
      this.loading = true
      this.finished = false
      if (!this.$route.params.id) return
      const params = {
        componentCode: this.selectedSidebar.componentCode,
        groupId: this.$route.params.id,
        ...this.searchQuery
      }
      if (brandList) params.brands = brandList
      queryAllPartsList(params).then(res => {
        this.list = this.list.concat(res.list)
        this.loading = false
        if (res.total > this.list.length) {
          this.searchQuery.pageIndex++
        } else {
          this.finished = true
        }
      })
    },
    queryTabs() {
      queryTopComponentList().then(res => {
        this.tabs = res
        this.activeTab = this.$store.state.carModel.firstcomponentcode
        queryBottomComponentList({
          componentCode: this.activeTab || res[0].componentCode
        }).then(res => {
          this.sidebars = res
          const codeIndex = res.findIndex(item => item.componentCode === this.$store.state.carModel.secondcomponentcode)
          this.activeSidebar = codeIndex === -1 ? 0 : codeIndex
          this.changeSidebar()
        })
      })
    }
  }
}
</script>
