<script setup>
import { ref, onMounted } from 'vue'
import { getMyNotice } from '@/composables/request'
import { useCookieStore } from '@/stores/cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const cookieStore = useCookieStore()

const notice = ref([])
if(cookieStore.cookies === ""){
    router.push('/login')
}

const GetDateNotice= async(cookie)=>{
   const res= await getMyNotice(cookie)
   notice.value = res.data.notice
   console.log(notice.value)    
}

// 通知详情
// notice.value
// [
//     {
//         "ggbt": "关于体育课免修、体育课外测试免测、缓测的实施办法",
//         "ggid": "CB0F41269E904D1DA5568D1AF70190D8",
//         "gglbname": "教务通知",
//         "ggfbsj": "2026-03-17"
//     },
//     {
//         "ggbt": "关于本科生转专业及留级等学籍变更退课选课的通知",
//         "ggid": "4802F01CAE344E27AF28296950CC2DB5",
//         "gglbname": "教务通知",
//         "ggfbsj": "2026-03-06"
//     },
//     {
//         "ggbt": "关于2025-2026学年第二学期湘雅校区本科生选课开课的通知",
//         "ggid": "92E275D5603B480B8BFFA23D316178D6",
//         "gglbname": "教务通知",
//         "ggfbsj": "2026-01-14"
//     },
//     {
//         "ggbt": "关于2025-2026学年第二学期本科生选课开课的通知",
//         "ggid": "00445691ED254181922DE1F486BCEFB0",
//         "gglbname": "教务通知",
//         "ggfbsj": "2026-01-12"
//     },
//     {
//         "ggbt": "中南大学课程成绩补登/更改审批表 ",
//         "ggid": "8C4BD5DE49B6473CBD3238AA8D54761E",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-12-15"
//     },
//     {
//         "ggbt": "关于本科生办理课程缓考的通知",
//         "ggid": "E2FBA8EFA6DB42968878FED63F168070",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-12-03"
//     },
//     {
//         "ggbt": "中南大学本科生缓考申请表",
//         "ggid": "C87514C28E2E4C36977D32B111EC45C4",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-12-03"
//     },
//     {
//         "ggbt": "关于本科生学期注册的通知",
//         "ggid": "DB71162C96314CD2BA8DD17A456A192D",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-10-09"
//     },
//     {
//         "ggbt": "中南大学本科生辅修课程免修、终止辅修学习以及转辅修类型办理流程",
//         "ggid": "C4008330E87C41FFBF5A927C80798B36",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-10-09"
//     },
//     {
//         "ggbt": "关于咨询本科生选课及学籍变更异常成绩处理的通知",
//         "ggid": "027DD2BB02F0489EA2CC7EA7037AE080",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-09-24"
//     },
//     {
//         "ggbt": "艺术类素质课课程表（2025年9月）",
//         "ggid": "63E2B51E06F94972BC5703C661049DE1",
//         "gglbname": "教务通知",
//         "ggfbsj": "2025-09-16"
//     },
//     {
//         "ggbt": "关于“再次修读”选课的说明",
//         "ggid": "FB49B395CBFB43DB8867243932C95433",
//         "gglbname": "教务通知",
//         "ggfbsj": "2024-10-22"
//     },
//     {
//         "ggbt": "网上选课及交换生留学生个性化选课操作说明",
//         "ggid": "8E9577B224E44B0FAE4FEBF413DFBA44",
//         "gglbname": "教务通知",
//         "ggfbsj": "2024-01-02"
//     },
//     {
//         "ggbt": "本科教务网络系统帐户设置及变更申请表",
//         "ggid": "E2609B8C8F1B4A3CB6AABEB735288D59",
//         "gglbname": "教务通知",
//         "ggfbsj": "2023-10-25"
//     },
//     {
//         "ggbt": "关于使用本科生线上电子成绩及在读证明的通知",
//         "ggid": "D65A9C35AC904C8E9C042899836DEFC1",
//         "gglbname": "教务通知",
//         "ggfbsj": "2023-09-21"
//     },
//     {
//         "ggbt": "中南大学课堂停开申请表",
//         "ggid": "BE535EFBF622438FAC82024E160862C6",
//         "gglbname": "教务通知",
//         "ggfbsj": "2023-02-07"
//     },
//     {
//         "ggbt": "关于教务管理系统加权平均成绩计算的说明",
//         "ggid": "741E3A1346C74626990B3C0079580FAC",
//         "gglbname": "教务通知",
//         "ggfbsj": "2021-03-22"
//     },
//     {
//         "ggbt": "中南大学本科生选课手册",
//         "ggid": "34F2E2D2E0D943D495F2520F5D05C8E5",
//         "gglbname": "教务通知",
//         "ggfbsj": "2020-08-28"
//     },
//     {
//         "ggbt": "本科生调整体测时间申请表",
//         "ggid": "0F51CE3644DF461BA1563754019F2301",
//         "gglbname": "教务通知",
//         "ggfbsj": "2018-11-12"
//     }
// ]
onMounted(()=>{
    if(cookieStore.cookies !== ""){
        GetDateNotice(cookieStore.cookies)
    }
})
</script>

<template>
    <div class="notice-container">
        <h2 class="title">通知公告</h2>
        <div class="notice-list">
            <div 
                v-for="item in notice" 
                :key="item.ggid" 
                class="notice-card"
            >
                <div class="notice-header">
                    <span class="notice-type">{{ item.gglbname }}</span>
                    <span class="notice-date">{{ item.ggfbsj }}</span>
                </div>
                <h3 class="notice-title">{{ item.ggbt }}</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>
.notice-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.notice-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.notice-card {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    border-left: 4px solid #409eff;
}

.notice-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.notice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.notice-type {
    background: #e6f7ff;
    color: #1890ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.notice-date {
    color: #999;
    font-size: 12px;
}

.notice-title {
    font-size: 15px;
    color: #333;
    margin: 0;
    line-height: 1.5;
    font-weight: 500;
}
</style>
