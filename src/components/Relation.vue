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

    const renderChart = () => {
        const options = {
            xAxis: {
                show: false,
                type: 'value'
            },
            yAxis: {
                show: false,
                type: 'value'
            },
            series: [
                {
                    type: 'graph',
                    // 不采用任何布局
                    layout: 'none',
                    // 使用二维的直角坐标系
                    coordinateSystem: 'cartesian2d',
                    // 节点标记的大小
                    symbolSize: 26,
                    z: 3,
                    // 边界标签（线条文字）
                    edgeLabel: {
                        normal: {
                            show: true,
                            color: '#fff',
                            textStyle: {
                                fontSize: 15
                            },
                            formatter: function (params) {
                                return params.data.speed
                            }
                        }
                    },
                    // 圆饼下文字
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            color: '#5e5e5e'
                        }
                    },
                    // 边两端的标记类型
                    eageSymbol: ['none', 'arrow'],
                    // 边两端的标记大小
                    eageSymbolSize: 8,
                    // 圆数据
                    data: props.data.relations.map(item => {
                        // id 为 0 ，表示数据中心，数据中心单独设置
                        if (item.id !== 0) {
                            return {
                                name: item.name,
                                category: 0,
                                active: true,
                                speed: `${item.speed}kb/s`,
                                // 位置
                                value: item.value
                            }
                        }
                        else {
                            return {
                                name: item.name,
                                value: item.value,
                                // 数据中心圆的大小
                                symbolSize: 100,
                                // 圆的样式
                                itemStyle: {
                                    normal: {
                                        // 渐变色
                                        color: {
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color: '#157eff'
                                                },
                                                {
                                                    offset: 1,
                                                    color: '#35c2ff'
                                                }
                                            ]
                                        }
                                    }
                                },
                                // 字体
                                label: {
                                    normal: {
                                        fontSize: '14'
                                    }
                                }
                            }
                        }
                    }),
                    links: props.data.relations.map((item, index) => ({
                        // 方向
                        source: item.source,
                        target: item.target,
                        // 线上的文字
                        speed: `${item.speed}kb/s`,
                        // 线的样式
                        lineStyle: {
                            normal: {
                                color: '#12b5d0',
                                // 曲线弯曲程度
                                curveness: 0.2
                            }
                        },
                        // 文字位置
                        label: {
                            show: true,
                            position: 'middle',
                            // 偏移量
                            offset: [1, 0]
                        }
                    }))
                },
                {
                    // 用于带有起点和终点信息的线数据的绘制
                    type: 'lines',
                    coordinateSystem: 'cartesian2d',
                    z: 1,
                    // 线特效的配置
                    effect: {
                        show: true,
                        smooth: false,
                        trailLength: 0.2,
                        // 箭头样式
                        symbol: 'arrow',
                        color: 'rgba(55,155,255,0.5)',
                        symbolSize: 12
                    },
                    // 线的样式
                    lineStyle: {
                        normal: {
                            curveness: 0.2,
                        }
                    },
                    // 线的数据级，前后线需要重合。数据固定
                    data: [
                        [{ coord: [0, 300] }, { coord: [50, 200] }],
                        [{ coord: [0, 100] }, { coord: [50, 200] }],
                        [{ coord: [50, 200] }, { coord: [100, 100] }],
                        [{ coord: [50, 200] }, { coord: [100, 300] }]
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
    import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3'
</script>

<template>
    <div>
        <dv-border-box-8>
        <div class="pt-3">【数据传递信息】</div>
        <div ref="target" class="w-full h-full"></div>
      </dv-border-box-8>
    </div>
</template>

<style lang="scss" scoped>

</style>