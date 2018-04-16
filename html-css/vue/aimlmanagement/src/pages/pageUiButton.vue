<template>
  <div id="pageQuiButton">
    <btn msg="确认" class="small"></btn>
  </div>
</template>

<script>
  import uiBtn from '../components/uiButton.vue'
  export default {
    name: 'pageUiButton',
    components: {
      'btn': uiBtn
    }
  }
</script>