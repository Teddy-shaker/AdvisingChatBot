function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('opacity-0'); // Adds a fade effect
    menu.classList.toggle('translate-y-[-20px]'); // Slide-down effect
  }


  const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
  
    // Example function to handle message sending
    sendBtn.addEventListener('click', () => {
      const userMessage = chatInput.value.trim();
      if (userMessage) {
        // Create user message bubble
        const userMessageBubble = document.createElement('div');
        userMessageBubble.classList.add('mb-4', 'text-right');
        userMessageBubble.innerHTML = `
          <div class="flex justify-end">
            <div class="bg-green-100 text-green-900 p-3 rounded-lg max-w-[70%] lg:max-w-[60%] text-sm md:text-base shadow">${userMessage}</div>
          </div>
        `;
        chatWindow.appendChild(userMessageBubble);
  
        // Clear input field
        chatInput.value = '';
  
        // Scroll chat window to the bottom
        chatWindow.scrollTop = chatWindow.scrollHeight;
  
        // Simulate bot response after 1 second
        setTimeout(() => {
          const botMessageBubble = document.createElement('div');
          botMessageBubble.classList.add('mb-4');
          botMessageBubble.innerHTML = `
            <div class="flex">
              <div class="bg-blue-100 text-blue-900 p-3 rounded-lg max-w-[70%] lg:max-w-[60%] text-sm md:text-base shadow">Thanks for your message! How else can I help?</div>
            </div>
          `;
          chatWindow.appendChild(botMessageBubble);
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 1000);
      }
    });