<template>
    <div class="VuexTest">
        <div class="VuexTest_1">
        <h1>VuexTest组件1</h1>
        <p>{{this.$store.state.user.store_count}}</p>
        <button @click="addCount">增加1</button>
        <button @click="addCount10">增加10</button>
        <button @click="StopThreeSecondAddOne">停止3秒增加1</button>
    </div>
         <div class="VuexTest_2">
        <h1>VuexTest组件2</h1>
        <p>{{this.$store.state.user.store_count}}</p>
        <button @click="subCount">减少1</button>

    </div>
    </div>
</template>


<script>

export default {
    name: 'VuexTest',
    methods:{
        addCount(){
            this.$store.commit('user/incrementOne')
        },
        subCount(){
            this.$store.commit('user/subtractOne')
            // commit('actionName',参数)
        },
        addCount10(){
            // 荷载payload
            this.$store.commit('user/increment10',10)       
        },
        StopThreeSecondAddOne(){
            this.$store.dispatch('user/stopThreeSecondAddOne',3)
        }

    },
   created() {
    console.log(this.$store.state.user.store_count);
}
}
</script>



<style scoped>
.VuexTest  {
    display: flex;  
    justify-content: center;
text-align: center;
 width: 500px;
 height: 300px;
 margin: 50px auto;
 border-radius: 10px;
 border: 1px solid #000;
}
.VuexTest_1  {
    box-sizing: border-box;
text-align: center;
 width: 200px;
 height: 300px;
 
border-right: 1px solid #000;
}
.VuexTest_2  {
    box-sizing: border-box;
text-align: center;
 width: 200px;
 height: 300px;

}
</style>
