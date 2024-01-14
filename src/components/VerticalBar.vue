<script setup>
    // onMounted生命周期
    import { ref, onMounted, watch } from "vue"
    import * as echarts from 'echarts'
    // vite 父子传值获取数据
    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    })
    // 获取 dom 实例
    const target = ref(null)
    // 1初始化 echarts 实例
    let mChart = null
    // 在 mounted 生命周期之后，实例化 echarts
    // 回掉方法
    onMounted(() => {
        mChart = echarts.init(target.value)
        // 渲染 echarts
        renderChart()
    })
    // 2 构建 option 配置对象
    // 渲染图表
    const renderChart = () => {
        const options = {
            xAxis: {
                type: 'category',
                //根据服务端数据筛选
                data: props.data.servers.map((item) => item.name),
                // 文字色值
                axisLabel: {
                    color: '#9EB1C8'
                }
            },
            yAxis: {
                type: 'value',
                show: false,
                max: function (value) {
                    return parseInt(value.max * 1.2)
                }
            },
            grid: {
                top: 16,
                right: 0,
                bottom: 26,
                left: -26,
                // 计算边距时，包含标签
                containLabel: true
            },
            series: [
                {
                    // 图表类型
                    type: 'bar',
                    // 数据筛选
                    data: props.data.servers.map((item) => ({
                        name: item.name,
                        value: item.value
                    })),
                    // 每个轴的样式
                    itemStyle: {
                        color: '#479AD3', // 设置柱子的颜色
                        barBorderRadius: 5, // 设置柱子的圆角
                        shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
                        shadowBlur: 5 // 设置柱子的阴影模糊大小
                    },
                    // 轴宽度
                    barWidth: 10,
                    // 轴上的字体
                    label: {
                        show: true,
                        // 设置标签位置为上侧
                        position: 'top',
                        textStyle: {
                            // 设置标签文本颜色
                            color: '#fff'
                        },
                        //给数值加后缀
                        formatter:'{c}%'
                    }
                }
            ]
        }
        mChart.setOption(options)
    }
    // 监听数据的变化，重新渲染图表
    watch(() => props.data, renderChart)
    // watch(
    //     () => props.data,
    //     () => {
    //         renderChart()
    //     }
    // )
    import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3'
</script>

<template>
    <div>
        <dv-border-box-8>
        <div class="">【服务资源占用比】</div>
        <!--w-full:宽度100%
            h-full:高度100%  -->
        <div ref="target" class="w-full h-full"></div>
       </dv-border-box-8>
    </div>
</template>

<style lang="scss" scoped>

</style>