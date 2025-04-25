const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = messageInput.value;
    const username = 'User';

    socket.emit('chat message', { username, message });
    messageInput.value = '';
});

socket.on('chat message', (data) => {
    const messageElement = document.createElement('li');
    messageElement.textContent = `${data.username}: ${data.message}`;
    messagesContainer.appendChild(messageElement);
});