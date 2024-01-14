<script setup>
    // onMounted生命周期
    import { ref, onMounted, watch } from "vue"
    import * as echarts from 'echarts'
    // 引入组件包
    import 'echarts-wordcloud'

    // vite 父子传值获取数据
    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    })
    // 获取 dom 实例
    const target = ref(null)

    // echarts 实例变量
    let mChart = null
    // 在 mounted 生命周期之后，实例化 echarts
    onMounted(() => {
        mChart = echarts.init(target.value)
        // 渲染 echarts
        renderChart()
    })

    // 随机颜色生成
    const randomRGB = () => {
        const r = Math.floor(Math.random() * 255)
        const g = Math.floor(Math.random() * 255)
        const b = Math.floor(Math.random() * 255)
        return `rgb(${r}, ${g}, ${b})`
    }

    const renderChart = () => {
        const options = {
            series: [
                {
                    type: 'wordCloud',
                    // 数据映射文本的大小范围
                    sizeRange: [8, 46],
                    // 文字旋转范围
                    rotationRange: [0, 0],
                    // 单词之间的间距
                    gridSize: 0,
                    // 渲染动画
                    layoutAnimation: true,
                    // 字体
                    textStyle: {
                        // 随机色值
                        color: randomRGB
                    },
                    // 高亮字体
                    emphasis:{
                        textStyle:{
                            fontWeight:'bold',
                            color:"#000"
                        }
                    },
                    //数据
                    data:props.data.datas
                }
            ]
        }
        mChart.setOption(options)
    }
    // 监听数据的变化，重新渲染图表
    watch(
        () => props.data,
        () => {
            renderChart()
        }
    )
    import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3'
</script>

<template>
    <div>
        <dv-border-box-8>
        <div>【关键词条】</div>
        <div ref="target" class="w-full h-full"></div>
        </dv-border-box-8>
    </div>
</template>

<style lang="scss" scoped>

</style>