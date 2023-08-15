document.addEventListener('DOMContentLoaded', () => {
    const messageBoard = document.querySelector('.message-board');
    const newMessageInput = document.querySelector('#new-message');
    const sendButton = document.querySelector('#send-button');
  
    sendButton.addEventListener('click', () => {
      const messageText = newMessageInput.value.trim();
      if (messageText !== '') {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = messageText;
        messageBoard.appendChild(messageElement);
        newMessageInput.value = '';
      }
    });
  });
  
  
  
  