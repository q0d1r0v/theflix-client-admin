<script setup lang="ts">
// imports
import { Loading, Notify } from 'quasar';
import {onMounted, ref} from 'vue'
import http from '../utils/axios';

const user = ref<object | any>({})

// methods
async function getUser() {
    try {
        Loading.show()
        const {data} = await http.get('/api/return-user')
        user.value = data
    }catch(e) {
        Notify.create({
            message: 'Foydalanuvchini yuklab olishda xatolik yuz berdi!',
            color: 'red'
        })
    } finally {
        Loading.hide()
    }
}

// mounted
onMounted(() => {
    getUser()
})
</script>

<template>
    <div>
        Account page

        <pre>
            {{ user }}
        </pre>
    </div>
</template>