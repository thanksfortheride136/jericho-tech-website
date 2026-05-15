// ============================
// Mobile menu toggle + footer year + hero video + ATLAS chat
// ============================
document.addEventListener("DOMContentLoaded", () => {
  // ============================
  // Mobile menu toggle
  // ============================
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ============================
  // Footer year
  // ============================
  const y = document.getElementById("year");

  if (y) {
    y.textContent = new Date().getFullYear();
  }

  // ============================
  // Hero video rotation
  // ============================
  const v = document.getElementById("heroVideo");

  if (v) {
    const vids = [
      "videos/bannervids/banner.webm"
    ];

    let i = 0;

    function setAndPlay(n) {
      v.src = vids[n];
      v.load();

      const p = v.play();

      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    }

    v.addEventListener("ended", () => {
      i = (i + 1) % vids.length;
      setAndPlay(i);
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        const p = v.play();

        if (p && typeof p.catch === "function") {
          p.catch(() => {});
        }
      }
    });

    setAndPlay(0);
  }

  // ============================
  // ATLAS chatbot
  // ============================
  const chatForm = document.querySelector("#chatForm");
  const atlasInput = document.querySelector("#atlasInput");
  const chatWindow = document.querySelector("#chatWindow");

  // Render Server URL:
  const ATLAS_BACKEND_URL = "https://atlas-chatbot-backend.onrender.com/chat";

  function addAtlasMessage(text, sender) {
    const message = document.createElement("div");
    message.classList.add("atlas-message");

    if (sender === "user") {
      message.classList.add("atlas-user-message");
    } else {
      message.classList.add("atlas-bot-message");
    }

    message.textContent = text;
    chatWindow.appendChild(message);
    chatWindow.classList.add("has-messages");
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  if (chatForm && atlasInput && chatWindow) {
    chatForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const userMessage = atlasInput.value.trim();

      if (!userMessage) {
        return;
      }

      addAtlasMessage(userMessage, "user");
      atlasInput.value = "";

      const thinkingMessage = document.createElement("div");
      thinkingMessage.classList.add("atlas-message", "atlas-bot-message");
      thinkingMessage.textContent = "Thinking...";
      chatWindow.appendChild(thinkingMessage);
      chatWindow.classList.add("has-messages");
      chatWindow.scrollTop = chatWindow.scrollHeight;

      try {
        const response = await fetch(ATLAS_BACKEND_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        thinkingMessage.remove();

        if (data.reply) {
          addAtlasMessage(data.reply, "bot");
        } else {
          addAtlasMessage("ATLAS had trouble answering. Please ask Mr. Cooper.", "bot");
        }
      } catch (error) {
        thinkingMessage.remove();
        addAtlasMessage("ATLAS is not connected right now. Please ask Mr. Cooper.", "bot");
        console.error(error);
      }
    });
  }
});