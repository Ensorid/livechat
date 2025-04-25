const socket = io();

const sendIcon = document.getElementById('send-icon');
const messageInput = document.getElementById('message-box');

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function sendMessage() {

    const datetime = new Date();
    const hour = datetime.getHours();
    const minute = datetime.getMinutes();
    const time = `${hour}:${minute}`

    const message = messageInput.value;
    const username = document.cookie
        .split('; ')
        .find(row => row.startsWith('username='))
        ?.split('=')[1] || 'Anonymous';

    if (message.trim() !== '') {
        socket.emit('chatMessage', { username, message });
        addMessage(message, username, time);
        messageInput.value = '';
    }
};

socket.on('receiveMessage', (data) => {
    const { username, message } = data;
    console.log(`Message from ${username}: ${message}`);
    addMessage(message, username, time);
});

socket.on('disconnect', () => {
    alert('Vous avez été déconnecté du serveur.');
});