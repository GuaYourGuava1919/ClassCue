<template>
  <div class="seats-area">
    <!-- 版型切換 -->
    <div class="toolbar">
      <label class="toolbar__label">
        <span class="label-text">版型：</span>
        <select v-model="selectedLayoutId" class="styled-select">
          <option v-for="layout in layouts" :key="layout.id" :value="layout.id">
            {{ layout.name }}
          </option>
        </select>
      </label>

      <!-- 圖例 -->
      <ul class="legend">
        <li><span class="dot dot--question"></span>問問題</li>
        <li><span class="dot dot--acceptance"></span>驗收</li>
        <li><span class="dot dot--idle"></span>空閒/預設</li>
      </ul>
    </div>

    <div class="seat-row" v-for="(row, rowIndex) in seats" :key="rowIndex">
      <!-- 用 idx 做 key；null 會渲染為空格 -->
      <div
        v-for="(seatNum, idx) in row"
        :key="idx"
        :class="['seat', seatNum ? seatClass(seatNum) : 'empty']"
      >
        <template v-if="seatNum">
          {{ seatNum }}
          <span v-if="seatPriority(seatNum)" class="priority">
            P{{ seatPriority(seatNum) }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useSeatQueueWatcher } from '../../composables/useSeatQueueWatcher'

type SeatLayout = {
  id: string
  name: string
  rows: (number | null)[][]
}

const { seatMap } = useSeatQueueWatcher()

/** --- 兩個座位表 --- */
const es601Layout: SeatLayout = {
  id: 'es601',
  name: 'ES601 座位表',
  rows: [
    [1, 2, 3, 4, null, 5, 6, 7, 8],
    [9, 10, 11, 12, null, 13, 14, 15, 16],
    [17, 18, 19, 20, null, 21, 22, 23, 24],
    [null, null, null, null, null, null, null, null, null],
    [25, 26, 27, 28, null, 29, 30, 31, 32],
    [33, 34, 35, 36, null, 37, 38, 39, 40],
    [41, 42, 43, 44, null, 45, 46, 47, 48],
    [49, 50, 51, 52, null, 53, 54, 55, 56],
    [57, 58, 59, 60, null, 61, 62, 63, 64],
    [65, 66, 67, 68, null, 69, 70, 71, 72],
  ]
}

const es401Layout: SeatLayout = {
  id: 'es401',
  name: 'ES401 座位表',
  rows: [
    [1, 2, 3, 4, 5, 6, null, null, null, null, null, null, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, null, 19, 20, 21, 22, null, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33, 34, null, 35, 36, 37, 38, null, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, null, 51, 52, 53, 54, null, 55, 56, 57, 58, 59, 60],
    [61, 62, 63, 64, 65, 66, null, 67, 68, 69, 70, null, 71, 72, 73, 74, 75, 76],
    [77, 78, 79, 80, 81, 82, null, null, null, null, null, null, 83, 84, 85, 86, 87, 88],
    [89, 90, 91, 92, 93, 94, null, null, null, null, null, null, 95, 96, 97, 98, 99, 100],
  ]
}

/** --- 版型清單與選擇 --- */
const layouts = [es601Layout, es401Layout]
const selectedLayoutId = ref<SeatLayout['id']>('es601')

const currentLayout = computed(
  () => layouts.find(l => l.id === selectedLayoutId.value) ?? es601Layout
)

const seats = computed(() => currentLayout.value.rows)

/** --- seatMap 樣式與角標 --- */
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
// ---------- 色票與基礎設定 ----------
$primary:        #2563eb; // 主色（藍）
$surface:        #f8fafc; // 工具列背景
$border:         #e5e7eb;
$text:           #334155; // 深灰文字
$muted:          #64748b; // 次要文字
$shadow:         rgba(0,0,0,.08);

// 狀態色
$state-question:   #f59e0b; // 問問題（橘）
$state-acceptance: #2563eb; // 驗收（藍）
$state-idle:       #94a3b8; // 預設/空閒

// 尺寸（可依容器縮放）
$seat-size: 60px;
$seat-radius: 12px;

// 淡入浮起
@mixin elevate($blur: 12px, $spread: 0) {
  box-shadow: 0 1px 2px rgba(0,0,0,.06),
              0 8px $blur $spread rgba(0,0,0,.04);
}

@mixin focus-ring($color: $primary) {
  outline: none;
  border-color: $color;
  box-shadow: 0 0 0 3px rgba(red($color), green($color), blue($color), .2);
}

.seats-area {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  padding: 1rem;
  align-items: center;
  margin: 2rem 0;
  color: $text;
}

// ---------- 工具列（含下拉與圖例） ----------
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: .75rem 1rem;
  background: $surface;
  border: 1px solid $border;
  border-radius: 14px;
  @include elevate(20px);
  width: 100%;
  max-width: 960px;
  justify-content: space-between;
  flex-wrap: wrap;

  &__label {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .label-text {
    font-size: .95rem;
    font-weight: 600;
    color: $text;
  }

  // 自訂箭頭的 select
  .styled-select {
    appearance: none;
    padding: .55rem 2.25rem .55rem .9rem;
    border-radius: 10px;
    border: 1px solid $border;
    background:
      linear-gradient(transparent, transparent) padding-box,
      linear-gradient(transparent, transparent) border-box;
    background-color: #fff;
    color: $text;
    font-size: .95rem;
    line-height: 1;
    transition: .2s ease;
    position: relative;

    // 右側箭頭（使用 svg data uri）
    background-image:
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M5 8l5 5 5-5' stroke='%2364748b' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/></svg>");
    background-repeat: no-repeat;
    background-position: right .6rem center;
    background-size: 18px;

    &:hover {
      border-color: darken($border, 8%);
      transform: translateY(-1px);
    }

    &:focus {
      @include focus-ring();
    }
  }

  // 圖例
  .legend {
    display: flex;
    align-items: center;
    gap: .9rem;
    list-style: none;
    padding: 0;
    margin: 0;
    color: $muted;
    font-size: .9rem;

    .dot {
      width: .75rem; height: .75rem; border-radius: 999px; display: inline-block; margin-right: .4rem;
      &--question { background: $state-question; }
      &--acceptance { background: $state-acceptance; }
      &--idle { background: $state-idle; }
    }
  }
}

// ---------- 座位格 ----------
.seat-row {
  display: flex;
  gap: .45rem;
  justify-content: center;
}

.seat {
  width: $seat-size;
  height: $seat-size;
  border-radius: $seat-radius;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  position: relative;
  background: #fff;
  color: $text;
  border: 1px solid $border;
  @include elevate(18px);
  transition: transform .15s ease, box-shadow .15s ease;

  &:not(.empty):hover {
    transform: translateY(-2px);
    @include elevate(26px);
  }

  // 預設/idle 樣式
  & {
    background-image: linear-gradient(180deg, #ffffff 0%, #f6f8fb 100%);
  }

  &.empty {
    visibility: hidden; // 保持格子佈局但不顯示
  }

  /* 問問題（橘色） */
  &.question {
    background: $state-question;
    color: #fff;
    border-color: transparent;
  }

  /* 驗收（藍色） */
  &.acceptance {
    background: $state-acceptance;
    color: #fff;
    border-color: transparent;
  }

  .priority {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #ef4444;
    color: #fff;
    font-weight: 700;
    font-size: .75rem;
    padding: 2px 6px;
    border-radius: 8px;
    @include elevate(12px);
  }
}

// ---------- RWD：小螢幕縮小座位 ----------
@media (max-width: 768px) {
  .seat {
    width: 46px;
    height: 46px;
    font-size: 1.05rem;
  }
}

@media (max-width: 420px) {
  .seat {
    width: 40px;
    height: 40px;
    font-size: .95rem;
    border-radius: 10px;
  }
  .toolbar {
    gap: .6rem;
    .legend { font-size: .85rem; }
  }
}
</style>
