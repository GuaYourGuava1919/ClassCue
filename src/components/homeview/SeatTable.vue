<template>
    <div class="seats-area">
      <div class="seat-row" v-for="(row, rowIndex) in seats" :key="rowIndex">
        <div
          class="seat"
          v-for="seatNum in row"
          :key="seatNum"
          :class="seatClass(seatNum)"
        >
          {{ seatNum }}
          <span v-if="seatPriority(seatNum)" class="priority">
            P{{ seatPriority(seatNum) }}
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { watchEffect } from 'vue'
import { useSeatQueueWatcher } from '../../composables/useSeatQueueWatcher'

const { seatMap } = useSeatQueueWatcher()

const seats = [
  [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  [36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19],
  [54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37],
  [72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55],
]

watchEffect(() => {
  console.log('🪑 最新 seatMap:', seatMap.value)
})


function seatClass(seatNum: number) {
  return seatMap.value[seatNum]?.status || ''
}

function seatPriority(seatNum: number) {
  return seatMap.value[seatNum]?.priority ?? null
}


</script>
  
  <style scoped lang="scss">
  .seats-area {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    align-items: center;
    margin: 3rem 0 ;
  }
  
  .seat-row {
    display: flex;
    gap: 0.4rem;
    justify-content: center;
  }
  
  .seat {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  position: relative;
  background-color: $text-color;
  color: $primary-color;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin: 5px;

  // 問問題（橘色）
  &.question {
    background-color: #ffa725;
    color: white;
  }

  // 驗收（藍色）
  &.acceptance {
    background-color: #27548a;
    color: white;
  }

  .priority {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #e74c3c;
    color: white;
    font-size: 14px;
    padding: 2px 4px;
    border-radius: 6px;
  }
}

  </style>
  