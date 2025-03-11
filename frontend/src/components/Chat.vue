<template>
    <div class="chat">
      <div class="users">👥 Онлайн ({{ users.length }}): <strong>{{ users.join(', ') }}</strong></div>
      <div class="messages" ref="messagesContainer">
        <div v-for="(msg, index) in messages" :key="index" class="message">
          <p><strong>{{ msg.nickname }}:</strong> {{ msg.message }}</p>
        </div>
      </div>
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Введите сообщение..." />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps(['nickname']);
const ws = ref(null);
const message = ref('');
const messages = ref([]);
const users = ref([]);

onMounted(() => {
    ws.value = new WebSocket('ws://localhost:3000');
    ws.value.onopen = () => ws.value.send(JSON.stringify({ type: 'join', nickname: props.nickname }));
    ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') messages.value.push(data);
        if (data.type === 'users') users.value = data.users;
    };
});

onUnmounted(() => {
    ws.value.close();
});

const sendMessage = () => {
    if (message.value.trim()) {
        ws.value.send(JSON.stringify({ type: 'message', nickname: props.nickname, message: message.value }));
        message.value = '';
    }
};
</script>

<style>
.chat { 
    width: 800px; 
    margin: 0 auto; 
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 8px; 
    background:#fff;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.users { 
    font-size: 14px; 
    color: #474747; 
    margin-bottom: 10px; 
    strong{
        color: #000000; 
    }
}
.messages { 
    height: 100%; 
    flex: 1 1 auto;
    overflow-y: auto; 
    padding: 10px; 
    max-height: 600px;
}
.message { 
    margin-bottom: 5px; 
    text-align: start;
    p{
        display: inline-block;
        overflow: auto;
        background:#fe9a8b;
        padding: 10px;
        border-radius:16px;
        margin: 0;
    }
}
input { 
    width: 600px; 
    margin-top: 10px; 
    padding: 18px; 
    margin-right: 10px; 
    border-radius:16px;
    background: #f6f6f6;
    color: black;
    font-size: medium;
    border: none;
}
</style>