<template>
    <div class="send-a">
        
        <h1>SendA发送</h1>
        <button @click="sendData">发送数据</button>
    </div>
</template>


<script>
import EventBus from '../utils/Bus.js'
export default {
    name: 'SendA',
    methods: {
        sendData() {
            EventBus.$emit('sendData', '这是SendA发送的数据')
        }
    }
}
</script>



<style scoped>
.send-a  {
text-align: center;
 width: 250px;
 height: 300px;
 margin: 50px auto;
border-right: 1px solid #000;
}
</style>
