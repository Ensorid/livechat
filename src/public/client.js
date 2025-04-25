const socket = io();

const sendIcon = document.getElementById('send-icon');
const messageInput = document.getElementById('message-box');

function sendMessage() {
    const message = messageInput.value;
    const username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1] || 'Anonymous';

    if (message.trim() !== '') {
        socket.emit('chatMessage', { username, message });
        addMessage(message);
        messageInput.value = '';
    }
};

socket.on('receiveMessage', (data) => {
    const { username, message } = data;
    console.log(`Message from ${username}: ${message}`);
});

socket.on('disconnect', () => {
    alert('Vous avez été déconnecté du serveur.');
});