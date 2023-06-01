<script setup lang="ts">
// imports
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// types
interface INavBarTypes {
    id: number
    title: string
    path: string
    icon: string
    active_icon: string
}

// route
const route = useRoute()

// router
const router = useRouter()

// data
const NavBarItems = ref<INavBarTypes[]>(
    [
        {
            id: 1,
            icon: 'ri-dashboard-line',
            active_icon: 'ri-dashboard-fill',
            path: '/',
            title: 'Dashboard'
        },
        {
            id: 2,
            icon: 'ri-file-add-line',
            active_icon: 'ri-file-add-fill',
            path: '/create-post',
            title: 'Yangi post yaratish'
        },
        {
            id: 3,
            icon: 'ri-group-line',
            active_icon: 'ri-group-fill',
            path: '/users',
            title: 'Foydalanuvchilar'
        },
    ]
)

// methods
function goToPage(path: string) {
    router.push(path)
}

</script>

<template>
    <div class="parent-left-bar">
        <div class="logo">
            <span>Theflix</span>
        </div>

        <div class="parent-menu" v-for="(nav_bar, index) of NavBarItems" :key="index" @click="goToPage(nav_bar.path)">
            <Icon :icon="route.fullPath === nav_bar.path ? nav_bar.active_icon : nav_bar.icon" :class="route.fullPath === nav_bar.path ? 'active-icon' : 'default-icon'" />
            <div :class="route.fullPath === nav_bar.path ? 'active-text' : 'default-text'">{{ nav_bar.title }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.parent-left-bar {
    min-width: 250px;
    height: 100vh;
    border: 1px solid rgba(0, 0, 0, 0.1);

    & .logo {
        width: 100%;
        padding: 10px;
        text-align: center;

        & span {
            font-size: x-large;
            user-select: none;
            cursor: pointer;
        }
    }
    .parent-menu {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        padding-top: 8px;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s;
        margin: 6px;
            & .default-icon {
                font-size: 22px;
            }
    }
    .parent-menu:hover {
        color: #1375f7;
    }
    .active-icon {
        font-size: 22px;
        color: #1375f7;
    }
    .active-text {
        color: #1375f7;
    }
}
</style>