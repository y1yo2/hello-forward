<template>
  <div id="pageUiButton">
    <ui-btn></ui-btn>
  </div>
</template>

<script>
  import uiBtn from '../components/uiButton.vue'
  export default {
    name: 'pageUiList',
    components: {
      'ui-btn': uiBtn
    }
  }
</script>