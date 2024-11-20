const socket = io();

// Listen for incoming messages and display them
socket.on('message', (data) => {
  const messagesList = document.getElementById('messages');
  const messageItem = document.createElement('li');
  messageItem.textContent = `${data.username}: ${data.message}`;
  messagesList.appendChild(messageItem);
});

// Send message when "Send" button is clicked
function sendMessage() {
  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;

  if (username && message) {
    // Emit message with username and message content
    socket.emit('chatMessage', { username, message });

    // Clear message input field after sending
    document.getElementById('message').value = '';
  } else {
    alert('Please enter a name and a message.');
  }
}