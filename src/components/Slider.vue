<!--
  组件说明：推荐页面轮播图片组件
  代码说明：多张图片时出现多图滚动标志"点"可滚动
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

/* 轮播容器美化 */
.swiper-container {
  width: 35%;
  margin: 0 auto;
  border-radius: 18px;
  box-shadow: 0 4px 18px 0 rgba(99,102,241,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.03);
  overflow: hidden;
  background: #fff;
  padding: 0;
  position: relative;
}
.swiper-wrapper {
  width: 100%;
}
.swiper-slide {
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f7ff;
}
.el-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.08);
  overflow: hidden;
  transition: transform 0.25s;
}
.swiper-slide-active .el-image {
  transform: scale(1.03);
}
/* 指示点美化 */
.swiper-pagination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 6px;
  display: flex;
  justify-content: center;
  z-index: 10;
  padding: 0;
  margin: 0;
}
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: #d1d5db;
  border-radius: 50%;
  margin: 0 2.5px;
  opacity: 0.8;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0 1px 2px rgba(99,102,241,0.08);
}
.swiper-pagination-bullet-active {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  opacity: 1;
  transform: scale(1.18);
}
@media (max-width: 600px) {
  .swiper-container {
    border-radius: 12px;
  }
  .el-image {
    height: 210px;
    border-radius: 10px;
  }
  .swiper-pagination {
    bottom: 2px;
  }
}
.el-menu.el-menu-demo .el-menu-item.is-active {
  background: #6366f1 !important;
  color: #fff !important;
}

.main-container {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 10px;
  width: 100%;
}
</style>