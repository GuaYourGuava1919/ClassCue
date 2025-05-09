<template>
    <div v-if="showDialog" class="dialog-overlay" @click.self="closeDialog">
      <div class="dialog">
        <h2>{{ steps[currentStep].title }}</h2>
        <img v-if="steps[currentStep].image" :src="steps[currentStep].image" class="illustration" />
        <!-- <p>{{ steps[currentStep].description }}</p> -->
        <p v-html="steps[currentStep].description.replace(/\n/g, '<br/>')"></p>

        <div class="actions">
          <button class="btn skip" @click="closeDialog">跳過教學</button>
          <div class="btns">
            <button class="btn primary" @click="prevStep" :disabled="currentStep === 0">
                上一步
            </button>
            <button class="btn primary" @click="nextStep">
                {{ isLastStep ? '我知道了' : '下一步' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { computed } from 'vue'
  
  const steps = [
  {
    title: '🎓 歡迎使用 ClassCue！',
    description: '這是專為教室設計的舉手系統，協助你快速排隊、管理與登記。',
    image: '/images/onboarding/welcome.png',
  },
  {
    title: '📌 登記座位',
    description: '輸入 9 位學號與座位號即可完成綁定，畫面下方會顯示登記成功結果。',
    image: '/images/onboarding/register.png',
  },
  {
    title: '✋ 舉手排隊',
    description: '點選「問問題」或「驗收」即可加入對應隊伍，畫面中會顯示你的號碼與狀態。',
    image: '/images/onboarding/queue.png',
  },
  {
  title: '🧑‍🏫 助教專區',
  description: '教師與助教可以管理所有排隊學生、清除綁定與查看座位狀態，快速協助學生提問。\n本系統特別支援手機版操作，方便在教室中移動使用。',
  image: '/images/onboarding/admin.png',
}
]

  
  const currentStep = ref(0)
  const showDialog = ref(false)
  
  const isLastStep = computed(() => currentStep.value === steps.length - 1)
  
  const nextStep = () => {
    if (!isLastStep.value) {
      currentStep.value++
    } else {
      closeDialog()
    }
  }

    const prevStep = () => {
        if (currentStep.value > 0) {
        currentStep.value--
        }
    }
  
  const closeDialog = () => {
    showDialog.value = false
    localStorage.setItem('hasSeenOnboarding', 'true')
  }
  
  onMounted(() => {
    const seen = localStorage.getItem('hasSeenOnboarding')
    if (!seen) showDialog.value = true
  })
  </script>
  
  <style scoped lang="scss">
.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog {
  background: white;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);

  h2 {
    margin-bottom: 1rem;
    color: #3e3f5b;
  }

  p {
    font-size: 1rem;
    color: #555;
  }

  .illustration {
    max-width: 100%;
    max-height: 300px;
    height: auto;
    border-radius: 12px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .actions {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;

    .btns {
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;

      &.skip {
        background-color: #ccc;
        color: #333;
      }

      &.primary {
        background-color: $primary-color;
        color: white;

        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }
    }
  }
}
</style>
