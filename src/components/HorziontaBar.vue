<script setup lang="ts">
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
    console.log(props.data)

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
        // 横向柱状图
        const options = {
            // x轴展示数据
            xAxis: {
                //将x昼的数据显示
                type: 'value',
                // 不展示x轴
                show: false,
                // 设置最大值
                max: function (value) {
                    // parseInt数值取整
                    return parseInt(value.max * 1.2)
                }
            },
            // y轴展示数据
            yAxis: {
                // 设置值为类型值
                type: 'category',
                // map函数获取指定数据的数组
                data: props.data.regions.map(item => item.name),
                // 使数据反向展示
                inverse: true,
                // 不展示轴线
                axisLine: {
                    show: false
                },
                // 不展现克度(单位)
                axisTick: {
                    show: false// 取消 Y 轴刻度
                },
                // 展示文字
                axisLabel: {
                    color: '#9EB1C8'
                }
            },
            // 图标绘制的位置，对应 上下左右
            grid: {
                top: 0,
                right: 10,
                bottom: 0,
                left: 0,
                // 包含标签
                containLabel: true
            },
            // 核心配置
            series: [
                {
                    // 类型为柱形图
                    type: 'bar',
                    // 将数值替换为接口数值
                    data: props.data.regions.map(item => ({
                        name: item.name,
                        value: item.value
                    })),
                    // 设置柱状背景样式
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180,180,180,0.2)'
                    },
                    // 设置柱状样式
                    itemStyle: {
                        color: '#5b98d1',
                        // 设置边角圆润
                        barBorderRadius: 5,
                        // 阴影
                        shadowColor: 'rgba(0,0,0,0.3)',
                        // 阴影模糊
                        shadowBlur: 5
                    },
                    // 每个轴的宽度
                    barWidth: 12,
                    // 字体
                    label: {
                        show: true,
                        // 标签文本位置
                        position: 'right',
                        textStyle: {
                            color: '#fff'
                        }
                    }
                }
            ]
        }

        // 3 通过 实例.setOption(option)
        mChart.setOption(options)
    }
    //通过监听实现数据动态变化
    watch(() => props.data, () => {
        renderChart()
    })
    import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3'
</script>

<template>
    <div>
        <dv-border-box8 >
            <div class=" ml-2 pt-1">【大区数据信息】</div>
            <!--w-full:宽度100%
                    h-full:高度100%  -->
            <div ref="target" class="w-full h-full ml-2">
            </div>
        </dv-border-box8>
    </div>
</template>

<style lang="scss" scoped>

</style>