<template>
    <header class="navbar">
      <div class="logo">ClassCue
      <p>Hey! Raise your hand 3.0</p>
      </div>
      <nav class="nav-links" :class="{ open: menuOpen }">
        <RouterLink to="/" class="nav-link" @click="menuOpen = false">首頁</RouterLink>
        <RouterLink to="/admin" class="nav-link" @click="menuOpen = false">管理者</RouterLink>

        <template v-if="currentUser">
          <span class="nav-link user-email">{{ currentUser }}</span>
          <button class="nav-link login-btn" @click="logout">登出</button>
        </template>
        <template v-else>
          <button class="nav-link login-btn" @click="showLogin = true; menuOpen = false">登入</button>
        </template>
      </nav>

      <button class="hamburger" @click="toggleMenu">☰</button>
  
    <!-- 登入 Dialog -->
      <div v-if="showLogin" class="dialog-overlay" @click.self="showLogin = false">
        <div class="dialog">
          <h2>登入系統</h2>
          <input type="email" placeholder="Email" v-model="email" />
          <input type="password" placeholder="密碼" v-model="password" />
          <div class="actions">
            <button class="btn" @click="showLogin = false">取消</button>
            <button class="btn primary" @click="login">登入</button>
          </div>
        </div>
      </div>

    </header>
  </template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import  { auth } from '../firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import router from '../router'

const menuOpen = ref(false)
const showLogin = ref(false)
const email = ref('')
const password = ref('')
const currentUser = ref<string | null>(null)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

// 登入行為
const login = async () => {
  try {
    const result = await signInWithEmailAndPassword(auth, email.value, password.value)
    currentUser.value = result.user.email
    showLogin.value = false
    email.value = ''
    password.value = ''
    alert('✅ 登入成功')
    router.push('/admin')
  } catch (err: any) {
    alert(`❌ 登入失敗：${err.message}`)
  }
}

// 登出
const logout = async () => {
  await signOut(auth)
  currentUser.value = null
  alert('👋 已登出')
  router.push('/')
}

// 初始載入時確認登入狀態
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user?.email || null
  })
})

</script>
  
  <style scoped lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: $primary-color;
    color: $text-color;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    z-index: 100;
    position: fixed;
    top: 0;
    box-sizing: border-box;
    width: 100%;
  
    .logo {
      font-size: 1.6rem;
      font-weight: bold;
      letter-spacing: 1px;
      font-family: "Playwrite DK Loopet", cursive;
    //   background-color: aqua;
      p{
        font-size: 0.8rem;
        margin: 0;
        color: $text-color;
      }
    }
  
    .nav-links {
    //   display: flex;
      gap: 1.5rem;
      transition: all 0.3s ease-in-out;
  
      .nav-link {
        background: none;
        border: none;
        color: $text-color;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        text-decoration: none;
        transition: background 0.2s;
  
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
  
        &.login-btn {
          font-family: inherit;
        }
      }
    }
  
    .hamburger {
      display: none;
      background: none;
    //   background-color: aqua;
      border: none;
      font-size: 2rem;
      color: $text-color;
      cursor: pointer;
      z-index: 101;
    }
  }
  
  // 響應式
  @media (max-width: 768px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      right: 1rem;
      top: 60px;
      background-color: $primary-color;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      animation: fadeIn 0.3s ease-out forwards;
  
      &.open {
        display: flex;
      }

    }
  
    .hamburger {
      display: block !important;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  // Dialog
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  
    .dialog {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  
      h2 {
        margin-bottom: 1rem;
        color: $primary-color;
      }
  
      input {
        width: 100%;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
  
      .actions {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
  
        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
  
          &.primary {
            background-color: $primary-color;
            color: $text-color;
          }
        }
      }
    }
  }
  </style>
  