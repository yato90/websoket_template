<template>
  <div class="chat-container">
    <h2>🔥 Онлайн Чат</h2>
    <Chat v-if="nickname" :nickname="nickname" />
    <div v-else class="nickname-input">
      <input v-model="nicknameInput" placeholder="Введите ваш ник" @keyup.enter="setNickname" />
      <button @click="setNickname">Войти</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Chat from './components/Chat.vue';

const nickname = ref(null);
const nicknameInput = ref('');

const setNickname = () => {
  if (nicknameInput.value.trim()) {
    nickname.value = nicknameInput.value;
  }
};
</script>

<style>
.chat-container { 
  text-align: center; 
  font-family: Arial, sans-serif; 
  padding: 20px; 
  background: #fe9a8b;
  border-radius:16px;
}
.nickname-input {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.nickname-input input { 
  padding: 18px; 
  margin-right: 10px; 
  border-radius:16px;
  background: #f6f6f6;
  color: black;
  font-size: medium;
  border: none;
}
.nickname-input button { 
  padding: 8px 12px; 
  cursor: pointer; 
  background: #f78ca0;
}
.nickname-input button:hover { 
  border-color: #ffffff;
}
</style>