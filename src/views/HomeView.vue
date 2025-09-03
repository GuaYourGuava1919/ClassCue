<template>
    <div class="home">
        <div class="title-area">
            <h1>ClassCue</h1>
        </div>
        <div class="teacher-area">
            <p>教師桌 / 投影機 / 主電腦區</p>
        </div>
        <SeatTable/>
        <div class="home__controlpanel">
            <Asign/>
            <Controlpanel/>
        </div>
    </div>
</template>

<script setup lang="ts">
// import Banner from '../components/Banner.vue'
import SeatTable from '../components/homeview/SeatTable.vue'
import Asign from '../components/homeview/Asign.vue'
import Controlpanel from '../components/homeview/Controlpanel.vue'

</script>

<style scoped lang="scss">
.home{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow-y: scroll;
    padding: 50vh 0;
    background:linear-gradient(to bottom, #f5f5f5, #FFDBDB);
    .title-area{
    font-family: "Playwrite DK Loopet", cursive;
    color: $primary-color;
        h1 {
        font-size: 48px;
        margin-bottom: 0.5rem;
        font-weight: 700;
        letter-spacing: 1px;
        }
        h2 {
            font-size: 32px;
            font-weight: 400;
        }
    }
    .teacher-area {
    width: 70%;
    text-align: center;
    background-color: $primary-color;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    color: $text-color;
    border-radius: 16px;
    margin-top: 1rem;
    padding: 10px 15px;
    font-size: 18px;
    }
    .home__controlpanel{
        display: flex;
        // flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 100px;
    }
}

</style>