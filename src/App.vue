<script setup lang="ts">
  import HorziontaBar from "./components/HorziontaBar.vue";
  import RadarBar from './components/RadarBar.vue';
  import Relation from './components/Relation.vue';
  import TotalData from './components/TotalData.vue';
  import MapChart from './components/MapChart.vue';
  import VerticalBar from './components/VerticalBar.vue';
  import RingBar from './components/RingBar.vue';
  import WordCloud from './components/WordCloud.vue';

  import { ref } from 'vue'
  import { getVisualization } from '@/api/visualization.js'
  import { BorderBox3 as DvBorderBox3 } from '@kjgl77/datav-vue3'
  import { BorderBox9 as DvBorderBox9 } from '@kjgl77/datav-vue3'


  // 获取数据
  const data = ref(null)
  const loadData = async () => {
    data.value = await getVisualization()
    console.log(data.value)
  }
  loadData()
  //间隔3s再次获取数据
  setInterval(() => {
    loadData()
  }, 3000)
  
</script>

<template>
  <dv-full-screen-container>
  <dv-border-box9  >
      <div  class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center 
      h-screen text-white p-5 flex overflow-hidden" v-if="data">
        <!-- 左 -->
        <div class=" flex-1 mr-2 bg-opacity-50 bg-slate-1000 p-3 flex flex-col ">
          <!-- 横向柱状图 -->
          <!-- v-bind=data="data.regionData"
             将数据从父组件传到子组件
          -->
          <HorziontaBar class="h-1/3 box-border pb-4  " :data="data.regionData" />
          <!-- 雷达图 -->
          <RadarBar class="h-1/3 box-border pb-4  " :data="data.riskData" />
          <!-- 关系图 -->
          <Relation class="h-1/3   " :data="data.relationData" />
        </div>
        <!-- 中 -->
        <div class="w-1/2 mr-2  flex  flex-col relative  ">
          <!-- 数据展示图 -->
          <TotalData class="bg-opacity-50 bg-slate-1000 p-3 flex-2  relative    " :data="data.totalData" />
          <!-- 地图可视化 -->
          <!-- <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1" :data="data.mapData" /> -->
        </div>
        <!-- 右 -->
        <div class=" flex-1 mr-2 bg-opacity-50 bg-slate-1000 p-3 flex flex-col">
          <!-- 竖向柱状图 -->
          <VerticalBar class="h-1/3 box-border pb-4 " :data="data.serverData" />
          <!-- 环形图 -->
          <RingBar class="h-1/3 box-border pb-4 " :data="data.abnormalData" />
          <!-- 文档云图 -->
          <WordCloud class="h-1/3 " :data="data.wordCloudData" />
        </div>
      </div>

  </dv-border-box9>
</dv-full-screen-container>
</template>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
#color{
  background: #bdc3c7;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2c3e50, #bdc3c7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>