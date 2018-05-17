<template>
    <router-view></router-view>
</template>
<script>
import AxiosService from '@/services/axios-service'

export default {
  created() {
    AxiosService.setConfigs({ store: this.$store })
  },
}
</script>
<style scoped>
</style>
