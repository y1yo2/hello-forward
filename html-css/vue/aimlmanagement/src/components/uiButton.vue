<template>
  <button class="qui-btn", v-on:click="btClickE">
    <span>{{msg}}</span>
  </button>
</template>

<script>
  //alert('here');
  export default{
    // data:function(){
    //   return {
    //     msg:'下载'
    //   }
    // }
    props: {
      msg: {
        default: '下载'
      }
    },
    methods: {
    btClickE: function(){
      alert(this.msg);
    }
  }
  }
</script>

<style scoped>
  @import './css/qui-btn.import.css'
  @import './css/reset.import.css'
</style>