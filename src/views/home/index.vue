<template>
  <div class="home">
    <NavBar>
      <span slot="title">系统首页</span><span slot="left" />
    </NavBar>
    <div>
      <div class="main-swipe">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
          <van-swipe-item><img src="../../assets/zy1.png" alt=""></van-swipe-item>
          <van-swipe-item><img src="../../assets/zy2.png" alt=""></van-swipe-item>
          <van-swipe-item><img src="../../assets/zy3.png" alt=""></van-swipe-item>
          <van-swipe-item><img src="../../assets/zy4.png" alt=""></van-swipe-item>
        </van-swipe>
      </div>
      <div class="main-grid mt5">
        <van-search placeholder="请输入17位车架号查询" @focus="$router.push('/vin')" />
        <van-grid :border="false" center square>
          <van-grid-item
            v-for="(item,index) in gridList"
            :key="item.currentName"
            :icon="item.logo"
            :text="item.currentName"
            @click="gridClick(item)"
          />
        </van-grid>
        <!--<iframe-->
          <!--id="pdf-window"-->
          <!--frameborder="0"-->
        <!--/>-->
      </div>
    </div>
  </div>
</template>
<script>
import { queryComponentListForPCApp, queryPDF } from '@/api/index'
import { ImagePreview } from 'vant'
import { signatureUrl } from '../../utils/signature'
const baseApi = process.env.VUE_APP_BASE_API
export default {
  data() {
    return {
      detail: {},
      gridList: [{
        currentName: '车辆信息',
        logo: require('../../assets/home_icon_1.png')
      }, {
        currentName: '变速箱',
        logo: require('../../assets/home_icon_2.png')
      }, {
        currentName: '保养件',
        logo: require('../../assets/home_icon_3.png')
      }, {
        currentName: '滤清器',
        logo: require('../../assets/home_icon_4.png')
      }, {
        currentName: '机油',
        logo: require('../../assets/home_icon_5.png')
      }, {
        currentName: '制动系',
        logo: require('../../assets/home_icon_6.png')
      }, {
        currentName: '点火系',
        logo: require('../../assets/home_icon_7.png')
      }, {
        currentName: '减震器',
        logo: require('../../assets/home_icon_8.png')
      }, {
        currentName: '正时皮带',
        logo: require('../../assets/home_icon_9.png')
      }, {
        currentName: '附件皮带',
        logo: require('../../assets/home_icon_10.png')
      }, {
        currentName: '蓄电池',
        logo: require('../../assets/home_icon_11.png')
      }, {
        currentName: '维修手册',
        logo: require('../../assets/home_icon_12.png'),
        handleClick: async() => {
          this.$router.push('/serviceManual')

          // const signatureUrl1 = signatureUrl({ id: 135243 })
          // location.href = '/pdf/web/viewer.html?file=' + encodeURIComponent(baseApi + '/bookRepair/manual/pdf?id%3D135243&signatureUrl=' + signatureUrl1)
          // document.getElementById('pdf-window').src =
        }
      }, {
        currentName: '正时及保养',
        logo: require('../../assets/home_icon_13.png'),
        handleClick: async() => {
          this.$router.push('/maintain')
        }
      }, {
        currentName: '维修案例',
        logo: require('../../assets/home_icon_14.png'),
        handleClick: () => {
          this.$router.push('/repair')
        }
      }, {
        currentName: '敬请期待',
        logo: require('../../assets/home_icon_15.png'),
        handleClick: () => {}
      }],
      current: 0
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    gridClick(item) {
      if (item.handleClick) {
        item.handleClick.bind(this)()
      } else {
        this.$store.commit('carModel/SET_FIRST_COMPONENT_CODE', item.firstcode)
        this.$store.commit('carModel/SET_SECOND_COMPONENT_CODE', item.secondcode)
        this.$router.push('/carModel')
      }
    },
    onChange(index) {
      this.current = index
    },
    getDetail() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中'
      })
      queryComponentListForPCApp().then(res => {
        this.gridList = this.gridList.map(item => {
          return {
            ...item,
            ...res.find(item2 => item2.name.indexOf(item.currentName) !== -1)
          }
        })
        this.$toast.clear()
      }).catch(err => {
        this.$toast.clear()
      })
    },
    showImgList(urls, index) {
      ImagePreview({
        images: urls.map(item => item.imgPath),
        startPosition: index,
        closeable: true
      })
    }
  }
}
</script>
