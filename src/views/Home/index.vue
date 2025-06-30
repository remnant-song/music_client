<template>
  <div class="home">
    <img :src="logo" alt="Vue logo" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ 是 /src 的别名
import HelloWorld from '@/components/HelloWorld.vue'
import logo from '@/assets/logo.png'  // 导入图片资源

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      logo
    }
  }
}
</script>
