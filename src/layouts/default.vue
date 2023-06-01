<script setup lang="ts">
// imports
import TopBar from '../components/TopBar.vue'
import LeftBar from '../components/LeftBar.vue'

</script>

<template>
    <div>
        <div class="bars">
            <left-bar />
            <div class="main">
                <top-bar title="Theflix" />
                <div class="page">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bars {
    display: flex;

    & .main {
        width: 100%;
            & .page {
            padding: 10px;
        }
    }
}
</style>