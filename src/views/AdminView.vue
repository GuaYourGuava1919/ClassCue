<template>
    <div>
        <div class="admin">
            <Controlpanel/>
            <ManualEnqueue/>
            <Asignlist/>
        </div>

    </div>
</template>

<script setup lang="ts">
import Controlpanel from '../components/adminview/Controlpanel.vue'
import Asignlist from '../components/adminview/Asignlist.vue'
import ManualEnqueue from '../components/adminview/ManualEnqueue.vue'
</script>

<style scoped>
.admin{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow-y: auto;
    padding: 100px 0;
    background:linear-gradient(to bottom, #f5f5f5, #FFDBDB); ;
}

</style>