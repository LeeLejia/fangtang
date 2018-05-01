<template>
  <div>
      <Publish class="container"></Publish>
  </div>
</template>
<style scoped>
    .container{
        width: 80%;
        margin-top:20px;
        margin-left:60px;
    }
</style>
<script>
    import Publish from '@/components/functional/Publish'
    export default {
        components:{
            Publish,
        }
    }
</script>
