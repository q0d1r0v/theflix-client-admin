<script setup lang="ts">
// imports
import { useRouter } from 'vue-router';
import {Icon} from '@iconify/vue'

// types
interface IDefinePropsType {
    title: string
}
// props
const props = defineProps<IDefinePropsType>()

// router
const router = useRouter()

// methods
function goToHomePage() {
    router.push('/')
}

function goToAccountPage() {
    router.push('/account')
}

</script>

<template>
    <div class="parent-bar">
        <div class="left-data">
            <span class="title" @click="goToHomePage">{{ props.title }}</span>
        </div>

        <div class="right-data">
            <q-btn unelevated round dense style="border: 1px solid rgba(0, 0, 0, 0.1);" @click="goToAccountPage">
                <Icon icon="ri-user-line"/>
            </q-btn>
        </div>
    </div>
</template>

<style scoped lang="scss">
.parent-bar {
    width: 100%;
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
        & .left-data {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
                & .title {
                    font-size: large;
                    -webkit-user-select: none;
                    cursor: pointer;
                }
        }
        .right-data {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: right;
        }
}

</style>