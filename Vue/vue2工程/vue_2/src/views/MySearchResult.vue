<template>
       <div class="container">
        <div class="search-container">
            <input v-model="searchText" type="text" class="search-input" placeholder="SEARCH...">
            <button class="search-button">
                <i class="fas fa-search"></i>
            </button>
        </div>
        
        <div class="results-info">
            找到约 <strong>11111</strong> 条结果 (用时 0.42 秒)
        </div>
        

    </div>
</template>

<script>
export default {
    name: 'MySearchResult',
    data() {
        return {
            searchText: ''
        }
    },


    // 组件挂载时执行
    mounted() {
        this.searchText = this.$route.query.searchText
        }



    }
  


</script>
<style scoped>
   
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f8f9fa;
            color: #333;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        
        /* 搜索框样式 */
        .search-container {
            position: relative;
            margin: 40px 0;
        }
        
        .search-input {
            width: 100%;
            padding: 15px 20px;
            padding-right: 60px;
            font-size: 16px;
            border: 2px solid #000;
            border-radius: 8px;
            outline: none;
        }
        
        .search-button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            font-size: 18px;
            color: #555;
        }
        
        /* 搜索结果样式 */
        .results-info {
            margin-bottom: 20px;
            color: #666;
        }
        
        .search-results {
            list-style: none;
        }
        
        .result-item {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .result-item:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .result-title {
            font-size: 18px;
            margin-bottom: 8px;
            color: #000;
        }
        
        .result-url {
            font-size: 14px;
            color: #006621;
            margin-bottom: 8px;
        }
        
        .result-snippet {
            font-size: 14px;
            color: #545454;
        }
        
        /* 分页样式 */
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 30px;
        }
        
        .pagination a {
            margin: 0 5px;
            padding: 8px 15px;
            text-decoration: none;
            color: #000;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        
        .pagination a.active {
            background-color: #000;
            color: white;
            border-color: #000;
        }
        
        .pagination a:hover:not(.active) {
            background-color: #f0f0f0;
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
            .search-input {
                padding: 12px 15px;
            }
            
            .result-item {
                padding: 15px;
            }
        }

        </style>
