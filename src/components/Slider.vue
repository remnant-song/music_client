<!--
  组件说明：推荐页面轮播图片组件
  代码说明：多张图片时出现多图滚动标志“点”可滚动
  使用范围：推荐页面
-->
<template>
  <Swiper
    :observer="true"
    :observeParents="true"
    :autoPlay="true"
    :showIndicator="true"
    :slidesPerView="1"  

    :allowTouchMove="true"     
    :effect="'slide'"
  >
    <Slide v-for="item in images" :key="item.key">
      <el-image :src="item.url" :title="item.name" fit="fill"></el-image>
    </Slide>
  </Swiper>
</template>
<script>
// import slider components
import { Swiper, Slide } from "vue-swiper-component";
export default {
  props: {
    images: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    Swiper,
    Slide,
  },
};
</script>

<style scoped>
.wh_content {
  height: 250px;
}

 /* 手机端样式轮播图片样式 */
 .swiper-container {
  width: 100%;
}

.swiper-wrapper {
  width: 100%;
}

.swiper-slide {
  width: 100%;
  flex-shrink: 0;
}
</style>