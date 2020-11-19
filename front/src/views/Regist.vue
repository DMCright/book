<template>
  <div class="home">
    <C1Regist msg="Welcome to Your Vue.js App"/>
  </div>
</template>


<script>
// @ is an alias to /src
import C1Regist from '@/components/c1_Regist.vue'

export default {
  name: 'Regist',
  components: {
    C1Regist
  }
}
</script>
