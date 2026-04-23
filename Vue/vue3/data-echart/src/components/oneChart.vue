<script setup>
import { ref,useTemplateRef,defineProps,onMounted } from 'vue'
import * as echarts from 'echarts';

const chartDOM = ref(null);
const chart = ref(null);

const props = defineProps({
    regionData: {
        type: Object,
        
    }
})

const ChartRender =()=>{
    chart.value.setOption({
        // x轴配置
        xAxis: {
            show: false,
            type:'value',
            max:function(value){
                return value.max*1.2;
            }
        },
        // y轴配置
        yAxis: {
            type: 'category',
            data: props.regionData.map(item => item.name),// 为什么报空属性
            // show: false,
            // 去掉y轴线
            axisLine: {
                show: false
            },
            // 去掉y轴刻度线
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#ffffff'
            },
        },
        // 图表区域配置
        grid: {
            left: 5,
            right: 0,
            top: 0,
            bottom: 0,
            containLabel: true,// 包含标签
        },
        // 核心配置
        series: [{
            type: 'bar',// 柱状图
            data: props.regionData.map(item => ({
                name: item.name,
                value: item.value
             })),
             showBackground: true, // 柱状图数据条背景
             backgroundColorStyle: { 
                color: 'rbga(180,180,180,0.2)'
             },
             itemStyle: { // 柱状图数据条样式
                borderRadius: 5,
                color: '#45fdff',
                shadowBlur: 10, // 阴影模糊半径
                shadowColor: 'rgba(0, 0, 0, 0.5)' // 阴影颜色
             },
             barWidth: 12, // 柱状图数据条宽度
             label:{
                show: true, // 显示标签
                position: 'right', // 标签位置
                color: '#ffffff' // 标签颜色
             }

        }]

        
    })

}

onMounted(() => {
    chart.value = echarts.init(chartDOM.value);
    // 图表渲染
    ChartRender();
    // setInterval(()=>{
    //     console.log(props.regionData.map(item => item.name),typeof props.regionData)
    // },10000)
})

</script>
<template>
   <div>
        <div class="chart-title">
            <h2 class="text-white text-lg font-bold">横向柱状图</h2>
        </div>
        <div ref="chartDOM" class="w-full h-full  mt-4 ">
            
        </div>
   </div>
</template>
