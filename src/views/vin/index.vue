<template>
  <div class="innerCon">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#4fc08d"
        placeholder="请输入VIN码搜索"
        @search="onSearch"
      >
        <div slot="action" @click="onCancel">取消</div>
        <div slot="label">VIN</div>
      </van-search>
    </form>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="vin-search-list"
      @load="onLoad"
    >
      <van-cell v-for="item in searchList" :key="item" @click="listSearch(item)">
        <span slot="title" style="width: 100%">{{ item }}</span>
        <van-icon
          slot="right-icon"
          name="search"
          style="line-height: inherit;"
        />
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import '../../styles/vin.scss'
import { Toast } from 'vant'

export default {
  data() {
    return {
      value: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    searchList() {
      return this.list.filter(item => item.indexOf(this.value) !== -1)
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    listSearch(val) {
      this.value = val
      this.onSearch(val)
    },
    onSearch(val) {
      Toast('搜索VIN：' + val)
    },
    onCancel() {
      this.$router.push('/home')
    },
    onLoad(val) {
      this.loading = true
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1 + 'ZXCAF' + this.list.length + 3 + 'X' + i * 9 / 3 + 'LA' + this.list.length + 3 + 'X' + i * 2)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>
