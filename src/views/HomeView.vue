<template>
    <div class="home">
        <Banner/>
        <SeatTable/>
        <div class="home__controlpanel">
            <Asign/>
            <Controlpanel/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Banner from '../components/Banner.vue'
import SeatTable from '../components/SeatTable.vue'
import Asign from '../components/Asign.vue'
import Controlpanel from '../components/Controlpanel.vue'

</script>

<style scoped lang="scss">
.home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow-y: auto;
    padding: 100px 0;
    background:linear-gradient(to bottom, #f5f5f5, #FFDBDB); ;
    .home__controlpanel{
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 100px;
    }
}

</style>