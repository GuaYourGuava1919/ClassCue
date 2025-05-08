<template>
    <div class="manual-enqueue">
      <h3>➕ 手動加入排隊</h3>
      <div class="form">
        <input
          v-model="studentId"
          type="text"
          maxlength="9"
          placeholder="輸入學號"
          @keyup.enter="enqueue"
        />
        <input
          v-model.number="seatNum"
          type="number"
          placeholder="座號"
          @keyup.enter="enqueue"
        />
        <select v-model="status">
          <option value="question">問問題</option>
          <option value="acceptance">驗收</option>
        </select>
        <button @click="enqueue">加入</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useSeatQueue } from '../../composables/useSeatQueue'
  
  const studentId = ref('')
  const seatNum = ref<number | null>(null)
  const status = ref<'question' | 'acceptance'>('question')
  
  const { updateSeatQueue } = useSeatQueue()
  
  const enqueue = async () => {
    await updateSeatQueue(studentId.value.trim(), seatNum.value, status.value)
    studentId.value = ''
    seatNum.value = null
  }
  </script>
  
  <style scoped lang="scss">
  .manual-enqueue {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    margin: 2rem;
    width: 90%;
    box-sizing: border-box;

  }
  
  .manual-enqueue h3 {
    margin-bottom: 1rem;
    color: #3e3f5b;
  }
  
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  input,
  select {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 16px;
    min-width: 120px;
  }
  
  button {
    background-color: $primary-color;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  
  button:hover {
    background-color: #469ba0;
  }
  </style>
  