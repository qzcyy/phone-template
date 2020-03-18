<template>
  <van-nav-bar
    :title="$route.meta.title"
    left-text="返回"
    left-arrow
    v-bind="$attrs"
    v-on="$listeners"
    @click-left="onClickLeft"
  >
    <slot slot="right" name="right" />
  </van-nav-bar>
</template>
<script>
export default {
  props: {
    onClickLeft: {
      default() {
        return () => {
          if (this.$route.query.goindex === 'true') {
            this.$router.push('/')
          } else {
            this.$router.back(-1)
          }
        }
      }
    }
  },
  methods: {

  }
}
</script>
