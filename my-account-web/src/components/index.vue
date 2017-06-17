<template>
  <div class="index">

    <div class="header">
      <v-header></v-header>
    </div>
    <div class="line"></div>
    <div style="margin:70px auto;width: 1000px">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import vHeader from './header.vue';
  export default {
    data() {
      return {
        activeIndex: '1',
        balance:'abcd'
      };
    },
    components: {
      vHeader
    },
    mounted(){

    }
  }
</script>
<style>
  .header{
    position: fixed;
    top:0;
    width: 100%;
    background-color: #324157;
    z-index: 10000;
  }


</style>
