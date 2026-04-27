<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMyClass } from '@/composables/request'
import { useCookieStore } from '@/stores/cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const cookieStore = useCookieStore()
const classInfo = ref([])

if(cookieStore.cookies === ""){
    router.push('/login')
}

const GetDateClass= async(cookie)=>{
   const res= await getMyClass(cookie)
   classInfo.value = res.data.classInfo
   console.log(classInfo.value)
}

const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
const timeSlots = [
    { label: '第1节', time: '8:00-9:40' },
    { label: '第2节', time: '10:00-11:40' },
    { label: '第3节', time: '14:00-15:40' },
    { label: '第4节', time: '16:40-17:40' },
    { label: '第5节', time: '19:00-20:40' },

]

const parseTitle = (title) => {
    if (!title) return {}
    const result = {
        kcmc: '',
        js: '',
        zc: '',
        xq: '',
        jc: '',
        dd: ''
    }
    
    const kcmcMatch = title.match(/课程名称：([^\\n]+)/)
    if (kcmcMatch) result.kcmc = kcmcMatch[1]
    
    const jsMatch = title.match(/上课教师：([^\\n]+)/)
    if (jsMatch) result.js = jsMatch[1]
    
    const zcMatch = title.match(/周次：([^\\n]+)/)
    if (zcMatch) result.zc = zcMatch[1]
    
    const xqMatch = title.match(/星期：([^\\n]+)/)
    if (xqMatch) result.xq = xqMatch[1]
    
    const jcMatch = title.match(/节次：([^\\n]+)/)
    if (jcMatch) result.jc = jcMatch[1]
    
    const ddMatch = title.match(/上课地点：([^\\n]+)/)
    if (ddMatch) result.dd = ddMatch[1]
    
    return result
}

const classSchedule = computed(() => {
    const schedule = {}
    weekDays.forEach((day, dayIndex) => {
        schedule[dayIndex + 1] = {}
        for (let i = 1; i <= 12; i++) {
            schedule[dayIndex + 1][i] = null
        }
    })
    
    classInfo.value.forEach(item => {
        const xq = parseInt(item.xq)
        const jc = parseInt(item.jc)
        
        if (xq >= 1 && xq <= 7 && jc >= 1 && jc <= 12) {
            schedule[xq][jc] = {
                ...parseTitle(item.title),
                raw: item
            }
        }
    })
    
    return schedule
})

const hasClass = (day, slot) => {
    return classSchedule.value[day] && classSchedule.value[day][slot]
}

const getClassInfo = (day, slot) => {
    return classSchedule.value[day]?.[slot]
}

onMounted(()=>{
    if(cookieStore.cookies !== ""){
        GetDateClass(cookieStore.cookies)
    }
})
</script>

<template>
    <div class="class-container">
        <h2 class="title">课程表</h2>
        
        <div class="schedule-table-wrapper">
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th class="time-col">时间</th>
                        <th v-for="day in weekDays" :key="day">{{ day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(slot, index) in timeSlots" :key="index">
                        <td class="time-cell">
                            <div class="time-label">{{ slot.label }}</div>
                            <div class="time-range">{{ slot.time }}</div>
                        </td>
                        <td 
                            v-for="day in weekDays" 
                            :key="day" 
                            class="class-cell"
                            :class="{ 'has-class': hasClass(weekDays.indexOf(day) + 1, index + 1) }"
                        >
                            <div v-if="hasClass(weekDays.indexOf(day) + 1, index + 1)" class="class-info">
                                <div class="class-name">{{ getClassInfo(weekDays.indexOf(day) + 1, index + 1).kcmc }}</div>
                                <div class="class-detail">{{ getClassInfo(weekDays.indexOf(day) + 1, index + 1).js }}</div>
                                <div class="class-detail">{{ getClassInfo(weekDays.indexOf(day) + 1, index + 1).dd }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.class-container {
    padding: 20px;
    overflow-x: auto;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.schedule-table-wrapper {
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.schedule-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    min-width: 900px;
}

.schedule-table th {
    background: #409eff;
    color: #fff;
    padding: 12px 8px;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
}

.schedule-table td {
    border: 1px solid #eee;
    padding: 8px;
    text-align: center;
    vertical-align: top;
    min-height: 60px;
}

.time-col {
    width: 100px;
}

.time-cell {
    background: #f5f7fa;
    padding: 8px !important;
}

.time-label {
    font-weight: bold;
    font-size: 14px;
    color: #333;
}

.time-range {
    font-size: 12px;
    color: #999;
    margin-top: 4px;
}

.class-cell {
    min-width: 120px;
    height: 60px;
}

.class-cell.has-class {
    background: #e6f7ff;
}

.class-info {
    font-size: 12px;
}

.class-name {
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 4px;
    font-size: 13px;
}

.class-detail {
    color: #666;
    font-size: 11px;
    line-height: 1.4;
}
</style>
