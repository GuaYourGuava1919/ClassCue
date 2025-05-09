<template>
  <div class="assignment">
    <div class="title-bar">
      <h3>登記座位</h3>
      <div class="divider"></div>
    </div>

    <div v-if="!hasRegistered" class="input-area">
      <div class="input-box">
        <label>學號</label>
        <input
          v-model="info.studentId"
          type="text"
          placeholder="9位學號"
          maxlength="9"
          @keyup.enter="markSeat"
        />
      </div>

      <div class="input-box">
        <label>座號</label>
        <input
          v-model.number="info.enteredSeat"
          type="number"
          min="1"
          max="72"
          placeholder="座位號碼"
          @keyup.enter="markSeat"
        />
      </div>
    </div>

    <div v-else class="registered-info">
      <p><strong>學號：</strong>{{ info.studentId }}</p>
      <p><strong>座位號碼：</strong>{{ info.enteredSeat }}</p>
    </div>

    <div class="control">
      <button v-if="!hasRegistered" @click="markSeat" class="register">登記</button>
      <button @click="deleteSeat" class="clear">解除綁定</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeatStorage } from '@/composables/useSeatStorage'
import { useSeatQueue } from '@/composables/useSeatQueue'

const {
  info,
  hasRegistered,
  register: markSeat,
  clear: clearSeatBinding, // ✅ 改成更語意化的名字
  // formatStudentId,
} = useSeatStorage()

const { removeSeatFromQueue } = useSeatQueue()


const deleteSeat = async () => {
  console.log(info.value.studentId)
  if (!info.value.studentId || !info.value.enteredSeat) {
    console.error('❌ studentId 或 seatNum 無效')
    return
  }
  await removeSeatFromQueue(info.value.studentId, info.value.enteredSeat)
  clearSeatBinding()
  console.log(`✅ 解除綁定座位 ${info.value.enteredSeat} 的學號 ${info.value.studentId}`)
}



</script>


<style scoped lang="scss">
.assignment {
  background-color: $primary-color;
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  width: 300px;
  color: $text-color;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  flex-wrap: wrap;
  flex-direction: column;

  .title-bar {
    width: 100%;
    h3 {
      margin: 0 0 0.3rem;
      font-size: 20px;
    }

    .divider {
      height: 2px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.3);
      margin-bottom: 1rem;
    }
  }

  .input-area {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 20px;

    .input-box {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 0.3rem;
        font-size: 18px;
        font-weight: bold;
      }

      input {
        padding: 0.5rem 0.7rem;
        border: none;
        border-radius: 6px;
        font-size: 18px;
      }
    }
  }

  .registered-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    // gap: 0.3rem;
    width: 300px;
    // padding-right: 1rem;
  }

  .control {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
    width: 100%;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
    }

    .register {
      background-color: #1abc9c;
      color: white;
    }

    .clear {
      background-color: #e74c3c;
      color: white;
    }
  }
}
</style>
