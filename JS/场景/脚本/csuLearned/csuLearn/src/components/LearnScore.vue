<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { getMyLearnScore } from '@/composables/request'
import { useCookieStore } from '@/stores/cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const cookieStore = useCookieStore()
const chartRef = ref(null)
let myChart = null

const learnScore = ref([])
if(cookieStore.cookies === ""){
    router.push('/login')
}

const GetDateNotice= async(cookie)=>{
   const res= await getMyLearnScore(cookie)
   learnScore.value = res.data.credit
   console.log(learnScore.value)    
   initChart()
}

const initChart = () => {
    if (!chartRef.value) return
    
    myChart = echarts.init(chartRef.value)
    
    const chartData = learnScore.value
        .filter(item => item.kclb !== '总学分')
        .map(item => ({
            name: item.kclb,
            value: parseFloat(item.xf) || 0
        }))
    
    const option = {
        title: {
            text: '学分分布',
            left: 'center',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}学分 ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [
            {
                name: '学分',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}: {c}'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                data: chartData,
                color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
            }
        ]
    }
    
    myChart.setOption(option)
}

onMounted(()=>{
    if(cookieStore.cookies !== ""){
        GetDateNotice(cookieStore.cookies)
    }
    window.addEventListener('resize', () => {
        myChart && myChart.resize()
    })
})
</script>

<template>
    <div class="score-container">
        <div ref="chartRef" class="chart"></div>
    </div>
</template>

<style scoped>
.score-container {
    padding: 20px;
}
.chart {
    width: 100%;
    height: 400px;
}
</style>
