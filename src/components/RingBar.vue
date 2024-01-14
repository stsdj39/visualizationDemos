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

    /**
     * 双环形图绘制原理：
     * 1. 环形图通过饼图绘制。内外边距的距离减小，即为环形。环形中心点需要不断改变，否则会重叠
     * 2. 环形图绘制分为 上层和底层 两部分。上层作为绘制进度，底层作为背景图
     * 3. 依据 getSeriesData 生成对应的 上层和底层 series 数据，进行渲染
     */
    // 渲染图表

    //  series方法
    const getSeriesData = () => {
        const series = []
        props.data.abnormals.forEach((item, index) => {
            //   上层
            series.push({
                name: item.name,
                type: 'pie',
                // 逆时针排列
                clockWise: false,
                // 不展示鼠标移入动画
                hoverAnimation: false,
                // 半径位置，需要依次递减，否则会重复在一处进行展示
                radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
                // 中心点
                center: ['55%', '55%'],
                label: {
                    show: false
                },
                data: [
                    {
                        value: item.value,
                        name: item.name
                    },
                    {
                        value: 1000,
                        name: '',
                        itemStyle: {
                            color: 'rgba(0,0,0,0)',
                            borderWidth: 0
                        },
                        topltip: {
                            show: false
                        },
                        hoverAnimation: false
                    }
                ]
            })

            // 底层
            series.push({
                name: item.name,
                type: 'pie',
                // 图形不响应事件
                silent: true,
                // z-index置于底层
                z: 1,
                // 逆时针排布
                clockWise: false,
                hoverAnimation: false,
                radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
                center: ['55%', "55%"],
                // 不展示 label
                label: {
                    show: false
                },
                data: [
                    // 绘制底线 75%
                    {
                        value: 7.5,
                        itemStyle: {
                            color: 'rgba(3,31,62)',
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false

                        },
                        hoverAnimation: false
                    },
                    // 绘制底线 25% 透明区域
                    {
                        value: 2.5,
                        name: '',
                        itemStyle: {
                            color: 'rgba(0,0,0,0)',
                            // 边框
                            borderWidth: 0
                        },
                        tooltip: {
                            show: false

                        },
                        hoverAnimation: false
                    }
                ]
            })

        })
        return series

    }
    const renderChart = () => {
        const options = {
            //    图例配置
            legend: {
                show: true,
                //   图例形状
                icon: 'circle',
                // 位置
                top: '14%',
                left: '60%',
                data: props.data.abnormals.map((item) => item.name),
                // 总宽度（一列）
                width: -5,
                // 每个色块的宽
                itemWidth: 20,
                // 每个色块的高度
                itemHight: -5,
                //   间距
                itemGap: 6,
                textStyle: {
                    fontSize: 12,
                    lineHight: 5,
                    color: 'rgba(255,255,255,0.8)'
                }
            },
            // 提示层
            tooltip: {
                show: true,
                tigger: 'item',
                // 饼图、仪表盘、漏斗图: {a}（系列名称），
                // {b}（数据项名称），{c}（数值）, {d}（百分比）
                formatter: '{a}<br>{b}:{c}({d}%)'
            },
            // Y轴
            yAxis: [
                {
                    type: 'category',
                    inverse: true,
                    // 不展示轴线
                    axisLine: {
                        show: false
                    }
                }
            ],
            // x轴
            xAxis: [
                {
                    show: false
                }
            ],
            // 核心配置
            series: getSeriesData()
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
        <div class="pt-2">【大区异常处理】</div>
        <div ref="target" class="w-full h-full pb-5"></div>
        </dv-border-box-1>
    </div>
</template>

<style lang="scss" scoped>

</style>