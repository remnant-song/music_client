<!-- 选择页面 -->
<template>
  <div>
    <SetInfo v-if="selectPage == 'setInfo'" />
    <SetPassword v-if="selectPage == 'editPassword'" />
  </div>
</template>

<script>
import SetInfo from "./SetInfo.vue";
import SetPassword from "./SetPassword.vue";
export default {
  name: "Like",
  components: { SetInfo, SetPassword },
  data() {
    return {};
  },
  computed: {
    selectPage() {
      return this.$route.params.value;
    },
  },
};
</script>