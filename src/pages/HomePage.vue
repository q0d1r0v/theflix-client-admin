<script setup lang="ts">
// imports
import { onMounted } from 'vue';
import {useStore} from '../store/index'

// store
const store = useStore()

onMounted(() => {
    store.increment()
})

</script>

<template>
    <div>
        {{ store.count }}
    </div>
</template>