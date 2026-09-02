/**
 * Mirja Riyadh - BIM Specialist Portfolio
 * Gemini AI BIM Assistant Chatbot Module
 */

(function () {
  'use strict';

  // Chatbot State
  const CHAT_STORAGE_KEY = 'mirja_bim_chat_history';
  const CHAT_OPEN_KEY = 'mirja_bim_chat_open';

  let isChatOpen = false;
  let isGenerating = false;
  let chatMessages = [];

  // Initial Welcome Configuration
  const INITIAL_WELCOME = {
    role: 'assistant',
    content: `Hi! I'm Mirja Riyadh's BIM Assistant.\n\nI can help you explore BIM services, find relevant projects, understand the workflow, or prepare a project inquiry.\n\nWhat can I help you with?`,
    suggestions: [
      'Explore Services',
      'View Projects',
      'Point Cloud to BIM',
      'MEP BIM & Coordination',
      'Request a Quote'
    ]
  };

  // DOM Elements
  let floatingBtn = null;
  let chatWindow = null;
  let messagesContainer = null;
  let chatInput = null;
  let sendBtn = null;
  let suggestionsBar = null;

  // Auto-inject complete CSS styles to ensure 100% standalone reliability
  function injectChatbotStyles() {
    if (document.getElementById('bim-chatbot-injected-css')) return;

    const style = document.createElement('style');
    style.id = 'bim-chatbot-injected-css';
    style.textContent = `
      .bim-chat-btn {
        position: fixed !important;
        bottom: 24px !important;
        right: 24px !important;
        z-index: 9999 !important;
        display: flex !important;
        align-items: center !important;
        background: #0f172a !important;
        border: 1px solid rgba(6, 182, 212, 0.5) !important;
        border-radius: 9999px !important;
        padding: 6px 14px 6px 8px !important;
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 20px rgba(6, 182, 212, 0.3) !important;
        cursor: pointer !important;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        user-select: none !important;
        text-decoration: none !important;
      }
      .bim-chat-btn:hover {
        border-color: #22d3ee !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 14px 35px -5px rgba(0, 0, 0, 0.8), 0 0 25px rgba(6, 182, 212, 0.5) !important;
      }
      .bim-chat-btn.is-active {
        background: #0891b2 !important;
        border-color: #22d3ee !important;
      }
      .bim-chat-btn-pulse {
        position: absolute;
        inset: -3px;
        border-radius: 9999px;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%);
        opacity: 0.6;
        animation: bimPulseGlow 3s infinite alternate;
        pointer-events: none;
        z-index: -1;
      }
      @keyframes bimPulseGlow {
        0% { transform: scale(0.98); opacity: 0.3; }
        100% { transform: scale(1.06); opacity: 0.7; }
      }
      .bim-chat-btn-inner {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .bim-chat-icon-wrap {
        position: relative;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(6, 182, 212, 0.15);
        border: 1px solid rgba(6, 182, 212, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #22d3ee;
      }
      .bim-chat-btn.is-active .bim-chat-icon-wrap {
        background: #0e7490;
        border-color: #fff;
        color: #fff;
      }
      .bim-chat-icon-bot, .bim-chat-icon-close {
        width: 18px;
        height: 18px;
      }
      .bim-chat-status-dot {
        position: absolute;
        top: 1px;
        right: 1px;
        width: 8px;
        height: 8px;
        background: #10b981;
        border: 1.5px solid #0f172a;
        border-radius: 50%;
      }
      .bim-chat-btn-label {
        font-size: 13px;
        font-weight: 700;
        color: #f1f5f9;
        letter-spacing: -0.01em;
        white-space: nowrap;
        font-family: inherit;
      }
      .bim-chat-window {
        position: fixed !important;
        bottom: 82px !important;
        right: 24px !important;
        width: 400px !important;
        max-width: calc(100vw - 32px) !important;
        height: 580px !important;
        max-height: calc(100vh - 105px) !important;
        z-index: 99999 !important;
        display: flex !important;
        flex-direction: column !important;
        background: #090e1a !important;
        border: 1px solid rgba(30, 41, 59, 0.9) !important;
        border-radius: 12px !important;
        box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.2) !important;
        backdrop-filter: blur(16px) !important;
        overflow: hidden !important;
        animation: bimChatSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
        font-family: inherit;
      }
      .bim-chat-window.hidden,
      .bim-chat-window:not(.is-open) {
        display: none !important;
      }
      .bim-chat-window.is-open {
        display: flex !important;
      }
      @keyframes bimChatSlideUp {
        from { opacity: 0; transform: translateY(16px) scale(0.97); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .bim-chat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        background: #0b1324;
        border-bottom: 1px solid #1e293b;
      }
      .bim-chat-header-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .bim-chat-avatar {
        position: relative;
        width: 34px;
        height: 34px;
        border-radius: 8px;
        background: rgba(6, 182, 212, 0.12);
        border: 1px solid rgba(6, 182, 212, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .bim-chat-online-badge {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 9px;
        height: 9px;
        background: #10b981;
        border: 2px solid #0b1324;
        border-radius: 50%;
      }
      .bim-chat-title-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .bim-chat-title {
        font-size: 13px;
        font-weight: 700;
        color: #f8fafc;
        line-height: 1.2;
      }
      .bim-chat-badge {
        font-size: 9px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 1px 5px;
        border-radius: 3px;
        background: rgba(6, 182, 212, 0.15);
        color: #22d3ee;
        border: 1px solid rgba(6, 182, 212, 0.3);
      }
      .bim-chat-subtitle {
        font-size: 11px;
        color: #94a3b8;
        margin-top: 1px;
      }
      .bim-chat-header-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .bim-chat-icon-action {
        padding: 6px;
        color: #94a3b8;
        background: transparent;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bim-chat-icon-action svg {
        pointer-events: none;
      }
      .bim-chat-icon-action:hover {
        color: #f8fafc;
        background: #1e293b;
      }
      .bim-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #080d19;
      }
      .bim-chat-messages::-webkit-scrollbar {
        width: 5px;
      }
      .bim-chat-messages::-webkit-scrollbar-thumb {
        background: #1e293b;
        border-radius: 3px;
      }
      .bim-chat-bubble-wrap {
        display: flex;
        gap: 8px;
        width: 100%;
      }
      .bim-chat-bubble-wrap.is-assistant {
        align-items: flex-start;
      }
      .bim-chat-bubble-wrap.is-user {
        justify-content: flex-end;
      }
      .bim-chat-msg-avatar {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        background: rgba(6, 182, 212, 0.15);
        border: 1px solid rgba(6, 182, 212, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .bim-chat-bubble {
        max-width: 86%;
        padding: 10px 13px;
        border-radius: 10px;
        font-size: 12.5px;
        line-height: 1.55;
      }
      .bim-chat-bubble-wrap.is-assistant .bim-chat-bubble {
        background: #0f172a;
        color: #e2e8f0;
        border: 1px solid #1e293b;
      }
      .bim-chat-bubble-wrap.is-user .bim-chat-bubble {
        background: #0891b2;
        color: #ffffff;
        border: 1px solid #06b6d4;
        border-bottom-right-radius: 2px;
      }
      .bim-chat-text p {
        margin-bottom: 6px;
      }
      .bim-chat-text p:last-child {
        margin-bottom: 0;
      }
      .bim-chat-text strong {
        color: #38bdf8;
        font-weight: 700;
      }
      .bim-chat-bubble-wrap.is-user .bim-chat-text strong {
        color: #ffffff;
      }
      .bim-chat-ul, .bim-chat-ol {
        margin: 6px 0;
        padding-left: 14px;
      }
      .bim-chat-li {
        list-style-type: disc;
        margin-bottom: 3px;
        color: #cbd5e1;
      }
      .bim-chat-ol-li {
        list-style-type: none;
        margin-bottom: 4px;
        color: #cbd5e1;
      }
      .bim-chat-num {
        font-weight: 700;
        color: #22d3ee;
      }
      .bim-chat-arrow {
        color: #22d3ee;
        font-weight: 700;
        padding: 0 3px;
      }
      .bim-chat-link {
        display: inline-block;
        color: #22d3ee;
        text-decoration: underline;
        text-underline-offset: 3px;
        font-weight: 600;
        transition: color 0.15s ease;
      }
      .bim-chat-link:hover {
        color: #67e8f9;
      }
      .bim-chat-chips-group {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 9px;
        padding-top: 8px;
        border-top: 1px solid #1e293b;
      }
      .bim-chat-chip {
        background: #0b1324;
        border: 1px solid rgba(6, 182, 212, 0.4);
        color: #cbd5e1;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 9px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.15s ease;
        white-space: nowrap;
      }
      .bim-chat-chip:hover {
        background: #0891b2;
        border-color: #22d3ee;
        color: #ffffff;
        transform: translateY(-1px);
      }
      .bim-chat-chip.is-highlight {
        background: rgba(6, 182, 212, 0.18);
        border-color: #22d3ee;
        color: #22d3ee;
        font-weight: 700;
      }
      .bim-chat-chip.is-highlight:hover {
        background: #06b6d4;
        color: #0f172a;
      }
      .bim-chat-bubble.is-typing {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 12px;
      }
      .bim-chat-typing-dot {
        width: 6px;
        height: 6px;
        background: #06b6d4;
        border-radius: 50%;
        animation: bimTypingBounce 1.2s infinite ease-in-out both;
      }
      .bim-chat-typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .bim-chat-typing-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes bimTypingBounce {
        0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
        40% { transform: scale(1); opacity: 1; }
      }
      .bim-chat-suggestions {
        display: flex;
        gap: 5px;
        overflow-x: auto;
        padding: 6px 12px;
        background: #090e1a;
        border-top: 1px solid #1e293b;
        scrollbar-width: none;
      }
      .bim-chat-suggestions::-webkit-scrollbar {
        display: none;
      }
      .bim-chat-bar-chip {
        background: #0f172a;
        border: 1px solid #1e293b;
        color: #94a3b8;
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 4px;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }
      .bim-chat-bar-chip:hover {
        border-color: #06b6d4;
        color: #22d3ee;
      }
      .bim-chat-bar-chip.is-quote {
        border-color: rgba(6, 182, 212, 0.4);
        color: #22d3ee;
      }
      .bim-chat-input-area {
        padding: 8px 12px 10px;
        background: #0b1324;
        border-top: 1px solid #1e293b;
      }
      .bim-chat-form {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #080d19;
        border: 1px solid #1e293b;
        border-radius: 8px;
        padding: 4px 6px 4px 10px;
        transition: border-color 0.2s ease;
      }
      .bim-chat-form:focus-within {
        border-color: #06b6d4;
        box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
      }
      .bim-chat-input {
        flex: 1;
        background: transparent;
        border: none;
        color: #f1f5f9;
        font-size: 12.5px;
        font-family: inherit;
        resize: none;
        max-height: 100px;
        outline: none;
        line-height: 1.4;
        padding: 4px 0;
      }
      .bim-chat-input::placeholder {
        color: #64748b;
        font-size: 11.5px;
      }
      .bim-chat-send-btn {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        background: #0891b2;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.15s ease;
        flex-shrink: 0;
      }
      .bim-chat-send-btn:hover:not(:disabled) {
        background: #06b6d4;
        transform: scale(1.05);
      }
      .bim-chat-send-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .bim-chat-footer-note {
        font-size: 9.5px;
        color: #64748b;
        text-align: center;
        margin-top: 5px;
        line-height: 1.2;
      }
      @media (max-width: 640px) {
        .bim-chat-btn {
          bottom: 16px !important;
          right: 16px !important;
          padding: 6px 10px 6px 6px !important;
        }
        .bim-chat-btn-label {
          font-size: 12px !important;
        }
        .bim-chat-window {
          bottom: 74px !important;
          right: 10px !important;
          left: 10px !important;
          width: auto !important;
          height: 75vh !important;
          max-height: calc(100vh - 90px) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize Chatbot on DOM Load
  function initBimChatbot() {
    injectChatbotStyles();
    if (document.getElementById('bim-chat-floating-btn')) return;

    createChatbotDOM();
    loadChatHistory();
    attachEventListeners();
  }

  // Create UI Elements & Inject into Body
  function createChatbotDOM() {
    // 1. Floating Action Button
    floatingBtn = document.createElement('button');
    floatingBtn.id = 'bim-chat-floating-btn';
    floatingBtn.className = 'bim-chat-btn';
    floatingBtn.setAttribute('aria-label', "Ask Mirja Riyadh's BIM Assistant");
    floatingBtn.setAttribute('aria-expanded', 'false');
    floatingBtn.innerHTML = `
      <div class="bim-chat-btn-pulse"></div>
      <div class="bim-chat-btn-inner">
        <div class="bim-chat-icon-wrap">
          <svg class="bim-chat-icon-bot" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <svg class="bim-chat-icon-close hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span class="bim-chat-status-dot"></span>
        </div>
        <span class="bim-chat-btn-label">Ask BIM Assistant</span>
      </div>
    `;

    // 2. Chat Window
    chatWindow = document.createElement('div');
    chatWindow.id = 'bim-chat-window';
    chatWindow.className = 'bim-chat-window hidden';
    chatWindow.setAttribute('role', 'dialog');
    chatWindow.setAttribute('aria-modal', 'true');
    chatWindow.setAttribute('aria-hidden', 'true');
    chatWindow.setAttribute('aria-label', 'BIM Assistant Chat Interface');

    chatWindow.innerHTML = `
      <!-- Header -->
      <div class="bim-chat-header">
        <div class="bim-chat-header-info">
          <div class="bim-chat-avatar">
            <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span class="bim-chat-online-badge"></span>
          </div>
          <div>
            <div class="bim-chat-title-row">
              <span class="bim-chat-title">BIM Assistant</span>
              <span class="bim-chat-badge">AI Portfolio</span>
            </div>
            <p class="bim-chat-subtitle">Mirja Riyadh • Revit & Scan-to-BIM</p>
          </div>
        </div>
        <div class="bim-chat-header-actions">
          <button type="button" id="bim-chat-clear-btn" class="bim-chat-icon-action" title="Clear Conversation" aria-label="Clear chat">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
          <button type="button" id="bim-chat-close-btn" class="bim-chat-icon-action" title="Close Chat (Esc)" aria-label="Close chat window">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages Area -->
      <div id="bim-chat-messages" class="bim-chat-messages" role="log" aria-live="polite"></div>

      <!-- Quick Action Chips Carousel -->
      <div id="bim-chat-suggestions" class="bim-chat-suggestions"></div>

      <!-- Input Area -->
      <div class="bim-chat-input-area">
        <form id="bim-chat-form" class="bim-chat-form" onsubmit="return false;">
          <textarea
            id="bim-chat-input"
            class="bim-chat-input"
            rows="1"
            placeholder="Ask about BIM services, projects, or quote..."
            aria-label="Your question or project description"
          ></textarea>
          <button
            type="submit"
            id="bim-chat-send-btn"
            class="bim-chat-send-btn"
            aria-label="Send message"
            disabled
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </form>
        <div class="bim-chat-footer-note">
          <span>Responses grounded in verified portfolio data & BIM standards.</span>
        </div>
      </div>
    `;

    document.body.appendChild(floatingBtn);
    document.body.appendChild(chatWindow);

    messagesContainer = document.getElementById('bim-chat-messages');
    chatInput = document.getElementById('bim-chat-input');
    sendBtn = document.getElementById('bim-chat-send-btn');
    suggestionsBar = document.getElementById('bim-chat-suggestions');
  }

  // Load History from Session
  function loadChatHistory() {
    try {
      const saved = sessionStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        chatMessages = JSON.parse(saved);
      }
    } catch (e) {
      chatMessages = [];
    }

    if (!chatMessages || chatMessages.length === 0) {
      chatMessages = [INITIAL_WELCOME];
    }

    renderAllMessages();
  }

  function saveChatHistory() {
    try {
      sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatMessages));
    } catch (e) {
      // Storage quota or disabled
    }
  }

  // Event Listeners
  function attachEventListeners() {
    // Toggle Button
    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleChat();
    });

    // Close Button Action
    const closeBtn = document.getElementById('bim-chat-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeChat();
      });
      closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          closeChat();
        }
      });
      closeBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeChat();
      }, { passive: false });
    }

    // Clear Button Action
    const clearBtn = document.getElementById('bim-chat-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        clearChat();
      });
    }

    // Form Submit
    const form = document.getElementById('bim-chat-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserSubmit();
    });

    // Input Events
    chatInput.addEventListener('input', () => {
      autoResizeTextarea();
      sendBtn.disabled = !chatInput.value.trim() || isGenerating;
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserSubmit();
      }
    });

    // Escape Key to Close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        closeChat();
      }
    });

    // Delegated click handler on chatWindow for action chips
    chatWindow.addEventListener('click', (e) => {
      const chip = e.target.closest('.bim-chat-chip, .bim-chat-bar-chip');
      if (chip) {
        e.preventDefault();
        e.stopPropagation();
        const actionText = chip.getAttribute('data-action-text');
        if (actionText && !isGenerating) {
          if (!isChatOpen) openChat();

          // Special handling for Quote
          if (actionText.toLowerCase() === 'request a quote' || actionText.toLowerCase().includes('quote')) {
            const contactModal = document.getElementById('contact-modal');
            if (contactModal) {
              contactModal.classList.remove('hidden');
              contactModal.classList.add('flex');
              contactModal.style.display = 'flex';
              document.body.style.overflow = 'hidden';
            }
          }

          chatInput.value = actionText;
          handleUserSubmit();
        }
      }
    });

    // Close on click outside (safely ignoring inside clicks and elements detached during re-renders)
    document.addEventListener('click', (e) => {
      if (!isChatOpen || !chatWindow) return;

      const target = e.target;
      if (!target) return;

      // If clicked inside chatWindow or floatingBtn, do not close
      if (
        chatWindow.contains(target) || 
        floatingBtn.contains(target) || 
        (target.closest && (target.closest('#bim-chat-window') || target.closest('#bim-chat-floating-btn')))
      ) {
        return;
      }

      // If target was removed from DOM during dynamic re-render (e.g. chip click), do NOT close
      if (!document.body.contains(target)) {
        return;
      }

      closeChat();
    });
  }

  function toggleChat() {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }

  function openChat() {
    isChatOpen = true;
    chatWindow.classList.remove('hidden');
    chatWindow.classList.add('is-open');
    chatWindow.style.display = 'flex';
    chatWindow.setAttribute('aria-hidden', 'false');
    floatingBtn.classList.add('is-active', 'is-open');
    floatingBtn.setAttribute('aria-expanded', 'true');

    const botIcon = floatingBtn.querySelector('.bim-chat-icon-bot');
    const closeIcon = floatingBtn.querySelector('.bim-chat-icon-close');
    if (botIcon) botIcon.classList.add('hidden');
    if (closeIcon) closeIcon.classList.remove('hidden');

    scrollToBottom();
    setTimeout(() => {
      if (chatInput) chatInput.focus();
    }, 150);

    // Track event
    if (window.trackBimEvent) {
      window.trackBimEvent('bim_chat_opened');
    }
  }

  function closeChat() {
    isChatOpen = false;
    chatWindow.classList.remove('is-open');
    chatWindow.classList.add('hidden');
    chatWindow.style.display = 'none';
    chatWindow.setAttribute('aria-hidden', 'true');
    floatingBtn.classList.remove('is-active', 'is-open');
    floatingBtn.setAttribute('aria-expanded', 'false');

    const botIcon = floatingBtn.querySelector('.bim-chat-icon-bot');
    const closeIcon = floatingBtn.querySelector('.bim-chat-icon-close');
    if (botIcon) botIcon.classList.remove('hidden');
    if (closeIcon) closeIcon.classList.add('hidden');
  }

  function clearChat() {
    chatMessages = [INITIAL_WELCOME];
    saveChatHistory();
    renderAllMessages();
    if (chatInput) chatInput.focus();
  }

  function autoResizeTextarea() {
    if (!chatInput) return;
    chatInput.style.height = 'auto';
    const newHeight = Math.min(chatInput.scrollHeight, 120);
    chatInput.style.height = newHeight + 'px';
  }

  // Handle User Message Submission
  async function handleUserSubmit() {
    const text = chatInput.value.trim();
    if (!text || isGenerating) return;

    // Reset input
    chatInput.value = '';
    autoResizeTextarea();
    sendBtn.disabled = true;

    // Push User Message
    chatMessages.push({
      role: 'user',
      content: text
    });
    saveChatHistory();
    renderAllMessages();
    scrollToBottom();

    // Show Typing Indicator
    showTypingIndicator();

    isGenerating = true;

    try {
      // Send to server /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatMessages,
          currentPath: window.location.pathname
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();
      removeTypingIndicator();

      // Append Assistant Message
      chatMessages.push({
        role: 'assistant',
        content: data.reply || "I'm here to assist with your BIM requirements.",
        suggestions: data.suggestions || ['Request a Quote', 'View Projects']
      });

      saveChatHistory();
      renderAllMessages();
      scrollToBottom();
    } catch (err) {
      console.warn('API connection issue, generating instant smart BIM response:', err);
      removeTypingIndicator();

      // Client-side rule engine fallback
      const fallback = generateClientSmartFallback(text);
      chatMessages.push({
        role: 'assistant',
        content: fallback.reply,
        suggestions: fallback.suggestions
      });

      saveChatHistory();
      renderAllMessages();
      scrollToBottom();
    } finally {
      isGenerating = false;
      sendBtn.disabled = !chatInput.value.trim();
    }
  }

  // Client-Side Fallback Engine
  function generateClientSmartFallback(userText) {
    const q = (userText || '').toLowerCase().trim();

    // 1. Point Cloud / Scan-to-BIM
    if (q.includes('point cloud') || q.includes('scan to bim') || q.includes('laser scan') || q.includes('scan') || q.includes('পয়েন্ট ক্লাউড') || q.includes('স্ক্যান')) {
      return {
        reply: `Point Cloud to BIM (Scan-to-BIM) converts 3D laser-scan data (.e57, .rcp, .rcs) into high-precision Autodesk Revit models (LOD 200–350).\n\nTypical Workflow:\nPoint Cloud Registration → Revit Modeling → Model Review → Documentation\n\nWould you like to explore our Scan-to-BIM project portfolio?`,
        suggestions: ['View Point Cloud Projects', 'Scan-to-BIM Workflow', 'Request a Quote', 'Explore Services']
      };
    }

    // 2. MEP BIM / Coordination
    if (q.includes('mep') || q.includes('hvac') || q.includes('plumbing') || q.includes('electrical') || q.includes('clash') || q.includes('duct') || q.includes('পাইপিং') || q.includes('ইলেকট্রিক্যাল') || q.includes('ক্ল্যাশ')) {
      return {
        reply: `Mirja Riyadh provides complete MEP BIM Modeling & 3D Coordination (HVAC ducting, plumbing, electrical systems, and plant rooms) at LOD 300–400 with clash resolution in Navisworks Manage.\n\nWould you like to review MEP case studies?`,
        suggestions: ['View MEP Projects', 'Clash Detection Process', 'Request a Quote', 'Explore Services']
      };
    }

    // 3. Price & Cost
    if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('rate') || q.includes('fee') || q.includes('charge') || q.includes('খরচ') || q.includes('কত টাকা') || q.includes('কত') || q.includes('রেট') || q.includes('প্রাইস')) {
      return {
        reply: `Project pricing depends on factors such as building size (sq.ft / m²), scope of disciplines, source drawings (CAD/PDF/Point Cloud), required LOD, and timeline.\n\nI can help you prepare the project information needed for an accurate quote.`,
        suggestions: ['Request a Quote', 'Prepare Requirements', 'View Projects', 'Explore Services']
      };
    }

    // 4. Architecture / CAD to Revit
    if (q.includes('architecture') || q.includes('architectural') || q.includes('revit') || q.includes('cad to revit') || q.includes('2d to 3d') || q.includes('autocad') || q.includes('dwg') || q.includes('নকশা') || q.includes('মডেলিং') || q.includes('আর্কিটেকচার')) {
      return {
        reply: `Architectural BIM services include transforming 2D CAD DWG or PDF drawings into detailed 3D Revit models, parametric family creation, construction documentation, and schedule extraction.\n\nKey Disciplines:\n• 2D CAD/PDF to Revit 3D Conversion\n• Exterior & Interior Parametric Modeling\n• Construction & Permit Drawing Sets\n\nWould you like to explore Architectural case studies?`,
        suggestions: ['View Architecture Projects', 'CAD to BIM Details', 'Request a Quote', 'Explore Services']
      };
    }

    // 5. Quote / Hire / Contact
    if (q.includes('quote') || q.includes('hire') || q.includes('contact') || q.includes('inquiry') || q.includes('order') || q.includes('যোগাযোগ') || q.includes('হায়ার') || q.includes('কোটেশন') || q.includes('কাজ দিতে চাই')) {
      return {
        reply: `You can submit your project requirements directly through our Quote & Inquiry form. Please share building type, approximate area, available source files, and required disciplines.`,
        suggestions: ['Request a Quote', 'View Projects', 'About Mirja Riyadh']
      };
    }

    // 6. About Mirja Riyadh
    if (q.includes('who are you') || q.includes('about') || q.includes('mirja') || q.includes('riyadh') || q.includes('experience') || q.includes('কে') || q.includes('অভিজ্ঞতা') || q.includes('পরিচয়')) {
      return {
        reply: `Mirja Riyadh is a professional Senior BIM Specialist and Revit Modeler with extensive hands-on experience in international Architectural, MEP, and Scan-to-BIM project delivery.\n\nSpecialized in Revit, Navisworks, AutoCAD, and Recap Pro delivering LOD 200–400 BIM models.\n\nWould you like to check out verified portfolio projects or get in touch?`,
        suggestions: ['View Projects', 'Explore Services', 'Request a Quote']
      };
    }

    // 7. Greeting / Hi / Hello
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.includes('হাই') || q.includes('হ্যালো') || q.includes('কেমন আছেন') || q.includes('salam') || q.includes('সালাম')) {
      return {
        reply: `Hello! I'm Mirja Riyadh's BIM Assistant. I can help you explore BIM services, find relevant portfolio projects (Architecture, MEP, Point Cloud), explain modeling workflows, or prepare a project estimate.\n\nWhat type of project are you planning?`,
        suggestions: ['Explore Services', 'View Projects', 'Point Cloud to BIM', 'Request a Quote']
      };
    }

    // 8. Default
    return {
      reply: `I can help you explore Mirja Riyadh's BIM services, find relevant portfolio projects, understand workflows, or prepare a project inquiry.\n\n• **Scan-to-BIM**: Converting point clouds (.e57/rcp) to Revit models (LOD 200–350)\n• **MEP BIM & Coordination**: HVAC, plumbing, electrical & clash detection\n• **Architectural BIM**: 2D CAD/PDF to Revit 3D, CD sets, BOQ extraction\n\nWhat can I help you with today?`,
      suggestions: ['Explore Services', 'View Projects', 'Point Cloud to BIM', 'MEP BIM & Coordination', 'Request a Quote']
    };
  }

  // Render Messages
  function renderAllMessages() {
    if (!messagesContainer) return;
    messagesContainer.innerHTML = '';

    chatMessages.forEach((msg, index) => {
      const bubble = document.createElement('div');
      bubble.className = `bim-chat-bubble-wrap ${msg.role === 'user' ? 'is-user' : 'is-assistant'}`;

      if (msg.role === 'assistant') {
        const formattedHtml = formatAssistantMarkdown(msg.content);
        bubble.innerHTML = `
          <div class="bim-chat-msg-avatar">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <div class="bim-chat-bubble">
            <div class="bim-chat-text">${formattedHtml}</div>
            ${renderMessageActions(msg.suggestions, index === chatMessages.length - 1)}
          </div>
        `;
      } else {
        bubble.innerHTML = `
          <div class="bim-chat-bubble">
            <div class="bim-chat-text">${escapeHtml(msg.content)}</div>
          </div>
        `;
      }

      messagesContainer.appendChild(bubble);
    });

    // Update bottom suggestions bar based on the latest assistant message
    renderSuggestionsBar();
    attachDynamicActionEvents();
  }

  // Format assistant markdown safely
  function formatAssistantMarkdown(text) {
    if (!text) return '';

    let html = escapeHtml(text);

    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Bullet lists (lines starting with • or - or 1.)
    html = html.replace(/^[\*\-•]\s+(.*)$/gm, '<li class="bim-chat-li">$1</li>');
    html = html.replace(/(<li class="bim-chat-li">.*<\/li>\n?)+/g, '<ul class="bim-chat-ul">$&</ul>');

    // Numbered lists
    html = html.replace(/^(\d+)\.\s+(.*)$/gm, '<li class="bim-chat-ol-li"><span class="bim-chat-num">$1.</span> $2</li>');
    html = html.replace(/(<li class="bim-chat-ol-li">.*<\/li>\n?)+/g, '<ol class="bim-chat-ol">$&</ol>');

    // Workflow arrows (e.g. A → B → C)
    html = html.replace(/(→|&rarr;)/g, '<span class="bim-chat-arrow">→</span>');

    // Links to project details
    html = html.replace(/project-details\.html\?id=([a-zA-Z0-9_-]+)/g, '<a href="project-details.html?id=$1" class="bim-chat-link" target="_blank">View Project ($1) ↗</a>');

    // General Paragraphs
    html = html.split('\n\n').map(p => {
      p = p.trim();
      if (!p) return '';
      if (p.startsWith('<ul') || p.startsWith('<ol')) return p;
      return `<p class="bim-chat-p">${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return html;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Render contextual action buttons inside message
  function renderMessageActions(suggestions, isLastMessage) {
    if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) return '';

    const chips = suggestions.map(label => {
      const isQuote = label.toLowerCase().includes('quote') || label.toLowerCase().includes('inquiry');
      return `
        <button type="button" class="bim-chat-chip ${isQuote ? 'is-highlight' : ''}" data-action-text="${escapeHtml(label)}">
          ${isQuote ? '📋 ' : ''}${escapeHtml(label)}
        </button>
      `;
    }).join('');

    return `<div class="bim-chat-chips-group">${chips}</div>`;
  }

  // Render quick chips at bottom suggestions bar
  function renderSuggestionsBar() {
    if (!suggestionsBar) return;

    const lastMsg = chatMessages[chatMessages.length - 1];
    const suggestions = (lastMsg && lastMsg.role === 'assistant' && lastMsg.suggestions) ? lastMsg.suggestions : INITIAL_WELCOME.suggestions;

    suggestionsBar.innerHTML = suggestions.map(label => {
      const isQuote = label.toLowerCase().includes('quote');
      return `
        <button type="button" class="bim-chat-bar-chip ${isQuote ? 'is-quote' : ''}" data-action-text="${escapeHtml(label)}">
          ${escapeHtml(label)}
        </button>
      `;
    }).join('');
  }

  // Attach click events to dynamically generated chips
  function attachDynamicActionEvents() {
    const allChips = document.querySelectorAll('.bim-chat-chip, .bim-chat-bar-chip');
    allChips.forEach(chip => {
      chip.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const actionText = chip.getAttribute('data-action-text');
        if (!actionText || isGenerating) return;

        // Ensure window stays open
        if (!isChatOpen) {
          openChat();
        }

        // Special handling for Quote
        if (actionText.toLowerCase() === 'request a quote' || actionText.toLowerCase().includes('quote')) {
          // Open existing contact modal if available
          const contactModal = document.getElementById('contact-modal');
          if (contactModal) {
            contactModal.classList.remove('hidden');
            contactModal.classList.add('flex');
            contactModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
          }
        }

        // Send action text as user prompt
        chatInput.value = actionText;
        handleUserSubmit();
      };
    });
  }

  function showTypingIndicator() {
    if (!messagesContainer) return;
    removeTypingIndicator();

    const indicator = document.createElement('div');
    indicator.id = 'bim-chat-typing-indicator';
    indicator.className = 'bim-chat-bubble-wrap is-assistant';
    indicator.innerHTML = `
      <div class="bim-chat-msg-avatar">
        <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <div class="bim-chat-bubble is-typing">
        <span class="bim-chat-typing-dot"></span>
        <span class="bim-chat-typing-dot"></span>
        <span class="bim-chat-typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('bim-chat-typing-indicator');
    if (el) el.remove();
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // Export API & Init
  window.BimChatbot = {
    open: openChat,
    close: closeChat,
    toggle: toggleChat,
    clear: clearChat
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBimChatbot);
  } else {
    initBimChatbot();
  }
})();
