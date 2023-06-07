<script setup lang="ts">
// imports
import { Loading, Notify } from 'quasar';
import { onMounted, ref } from 'vue'
import http from '../utils/axios';

// data
const api_page = ref<string>('')

// methods
async function getApiDocsPage() {
    try {
        Loading.show()
        const { data } = await http.get('/api/docs')
        api_page.value = data
    } catch (e) {
        Notify.create({
            color: "red",
            message: "Api docs ni yuklab olishda xatolik yuz berdi!"
        })
    } finally {
        Loading.hide()
    }
}

// mounted
onMounted(() => {
    getApiDocsPage()
})

</script>

<template>
    <div>
        <div v-if="api_page" class="docs">
            <div v-html="api_page">

            </div>
            <!-- Api page -->
        </div>

        <div v-else>
            We have not api page or you have some error in your page
        </div>
    </div>
</template>

<style scoped lang="scss">
.docs {
    padding: 10px;
    overflow-y: scroll;
    max-height: 100vh;
}
</style>