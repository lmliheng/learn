<template>
    <div class="send-b">
        
        <h1>SendB接收</h1>
        <p>{{ msg }}</p>
    </div>
</template>


<script>
import EventBus from '../utils/Bus.js'
export default {
    name: 'SendB',
    data() {
        return {
            msg: ''
        }
    },

    methods: {
        
    },

    created() {
       EventBus.$on('sendData', (data) => {
                this.msg = data
            })
    },
}
</script>

<style scoped>
.send-b  {
text-align: center;
 width: 250px;
 height: 300px;
 margin: 50px auto;

}
</style>


