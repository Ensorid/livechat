const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-box');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    const username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1] || 'Anonymous';

    socket.emit('chat message', { username, message });
    messageInput.value = '';
});

socket.on('chat message', (data) => {
    const messageElement = document.createElement('li');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messagesContainer.appendChild(messageElement);
});

socket.on('disconnect', () => {
    alert('Vous avez été déconnecté du serveur.');
});