<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMyScore } from '@/composables/request'
import { useCookieStore } from '@/stores/cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const cookieStore = useCookieStore()

const score = ref([])
const rawHtml = ref('')

if(cookieStore.cookies === ""){
    router.push('/login')
}

const parseScoreHtml = (html) => {

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const rows = doc.querySelectorAll('table tr')
    
    const scores = []
    rows.forEach((row, index) => {
        if (index === 0) return
        const cells = row.querySelectorAll('td')
        if (cells.length >= 6) {
            const scoreItem = {
                kcmc: cells[0]?.textContent?.trim() || '',
                kcxz: cells[1]?.textContent?.trim() || '',
                xf: cells[2]?.textContent?.trim() || '',
                rwz: cells[3]?.textContent?.trim() || '',
                cj: cells[4]?.textContent?.trim() || '',
                xn: cells[5]?.textContent?.trim() || '',
                xq: cells[6]?.textContent?.trim() || ''
            }
            if (scoreItem.kcmc) {
                scores.push(scoreItem)
            }
        }
    })
    return scores
}

const GetDateScore= async(cookie)=>{
   const res= await getMyScore(cookie)
   rawHtml.value = res.data.score
   score.value = parseScoreHtml(rawHtml.value)
  // console.log(score.value)    
}

const totalCredits = computed(() => {
    return score.value.reduce((sum, item) => sum + (parseFloat(item.xf) || 0), 0)
})

const averageScore = computed(() => {
    const validScores = score.value.filter(item => item.cj !== '' && !isNaN(parseFloat(item.cj)))
    if (validScores.length === 0) return 0
    const sum = validScores.reduce((s, item) => s + (parseFloat(item.cj) || 0), 0)
    return (sum / validScores.length).toFixed(2)
})

const getScoreClass = (scoreStr) => {
    const score = parseFloat(scoreStr)
    if (isNaN(score)) return ''
    if (score >= 90) return 'score-a'
    if (score >= 80) return 'score-b'
    if (score >= 70) return 'score-c'
    if (score >= 60) return 'score-d'
    return 'score-f'
}

onMounted(()=>{
    if(cookieStore.cookies !== ""){
        GetDateScore(cookieStore.cookies)
    }
})
</script>

<template>
    <div class="score-container">
        <h2 class="title">成绩单</h2>
        
        <div class="score-summary">
            <div class="summary-item">
                <span class="label">总学分:</span>
                <span class="value">0</span>
            </div>
            <div class="summary-item">
                <span class="label">平均分:</span>
                <span class="value">{{ averageScore }}</span>
            </div>
            <div class="summary-item">
                <span class="label">课程数:</span>
                <span class="value">{{ score.length }}</span>
            </div>
        </div>
        
        <div class="table-wrapper">
            <table class="score-table">
                <thead>
                    <tr>
                        <th>次序</th>
                        <th>课程名称</th>
                        
                        <th>学分</th>
                        <th>任课教师</th>
                        <th>成绩</th>
                       
                        <th>学期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in score" :key="index">
                         <td>{{ item.kcxz }}</td>
                        <td :class="getScoreClass(item.cj)">{{ item.cj }}</td>
                          <td>{{ item.xq }}</td>
                        <td>{{ item.kcmc }}</td>
                       <td>{{ item.xn }}</td>
                      
                        <td>{{ item.rwz }}</td>
                        
                        
                      
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.score-container {
    padding: 20px;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.score-summary {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 24px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 8px;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.summary-item .label {
    color: #666;
    font-size: 14px;
}

.summary-item .value {
    font-size: 20px;
    font-weight: bold;
    color: #409eff;
}

.table-wrapper {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.score-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    font-size: 14px;
}

.score-table th {
    background: #409eff;
    color: #fff;
    padding: 12px 8px;
    text-align: center;
    font-weight: 500;
}

.score-table td {
    padding: 12px 8px;
    text-align: center;
    border-bottom: 1px solid #eee;
}

.score-table tr:hover {
    background: #f5f7fa;
}

.score-a {
    color: #67c23a;
    font-weight: bold;
}

.score-b {
    color: #409eff;
    font-weight: bold;
}

.score-c {
    color: #e6a23c;
    font-weight: bold;
}

.score-d {
    color: #f56c6c;
    font-weight: bold;
}

.score-f {
    color: #909399;
}
</style>
