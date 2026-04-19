<script setup>
import { computed ,defineProps} from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icons',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

console.log(symbolId.value)

</script>

<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

