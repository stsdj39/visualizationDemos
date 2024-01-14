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

    // echarts 实例变量
    let mChart = null
    // 在 mounted 生命周期之后，实例化 echarts
    onMounted(() => {
        mChart = echarts.init(target.value)
        // 渲染 echarts
        renderChart()
    })

    // 渲染图表
    const renderChart = () => {
        const options = {
            // 雷达图坐标系配置
            radar: {
                name: {
                    textStyle: {
                        color: '#05D5FF',
                        fontSize: 14
                    }
                },
                // 雷达绘制类型。polygon 多边形
                shape: 'polygon',
                // 位置居中
                center: ['50%', '50%'],
                // 边境
                radius: '80%',
                // 开始的角度（可以避免绘制到边框之外）
                startAngle: 120,
                //轴线配置
                axisLine: {
                    lineStyle: {
                        color: 'rgba(5, 213, 255, 0.8)'
                    }
                },
                // 网格线
                splitLine: {
                    show: true,
                    lineStyle: {
                        idth: 1,
                        color: 'rgba(5, 213, 255, .8)' // 设置网格的颜色
                    }
                },
                // 指示器文字
                indicator: props.data.risks.map(item => ({
                    name: item.name,
                    max: 100
                })),
                // 不展示拆分区域
                spliArea: {
                    show: false
                }
            },
            // 坐标极点
            polar: {
                center: ['50%', '50%'],
                radius: '0%'
            },
            //坐标角度
            angleAxis: {
                min: 0,
                // 分割间隔
                interval: 5,
                // 使角度以逆时针增长
                clockwise: false
            },
            //径向轴
            radiusAxis: {
                min: 0,
                // 分割间隔
                interval: 5,
                splitLine: {
                    show: true
                }
            },
            // 图标核心配置
            series: [
                {
                    type: 'radar',
                    // 拐点的样式，还可以取值'rect','angle'等
                    symbol: 'circle',
                    // 拐点的大小
                    symbolSize: 10,
                    itemStyle: {
                        color: '#05D5FF'
                    },
                    // 区域填充样式
                    areaStyle: {
                        normal: {
                            color: '#05D5FF',
                            opacity: 0.5
                        }
                    },
                    // 线条样式
                    lineStyle: {
                        withd: 2,
                        color: '#05D5FF'
                    },
                    // 图形上的文本标签
                    label: {
                        // normal文本粗细
                        normal: {
                            show: true,
                            color: '#fff'
                        },
                    },
                    data:
                        [
                            {
                                value: props.data.risks.map((item) => item.value)
                            }
                        ]
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
    import { BorderBox1 as DvBorderBox1 } from '@kjgl77/datav-vue3'
</script>

<template>
    <div>
        <dv-border-box-1>
            <div>【云端报警风险】</div>
            <div ref="target" class="w-full h-full"></div>
        </dv-border-box-1>
    </div>
</template>

<style lang="scss" scoped>

</style>