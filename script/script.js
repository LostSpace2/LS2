document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Открытие модального окна при клике на иконку папки
  document.querySelectorAll(".papka").forEach(folderIcon => {
    folderIcon.addEventListener("click", () => {
      const modalId = "modal" + folderIcon.id.replace("openModal", "");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
        toggleFooterFolder(true);
      }
    });
  });

  // 🔹 Закрытие модального окна по кнопке "×" или "Закрыть"
  document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
      const targetId = closeBtn.dataset.close;
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.style.display = "none";
        toggleFooterFolder(false);
      }
    });
  });

  // 🔹 Закрытие модального окна при клике вне области контента
  window.addEventListener("click", event => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none";
      toggleFooterFolder(false);
    }
  });

  // 🔹 Закрытие всех окон по клавише Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
      });
      toggleFooterFolder(false);
    }
  });

  // ⏰ Запуск обновления часов
  updateClock();
  setInterval(updateClock, 60000);
});

// ✅ Валидация пароля для папки "Секретно"
function checkPassword() {
  const input = document.getElementById("secret-password").value;
  const message = document.getElementById("secret-message");
  if (input === "1234") {
    message.style.display = "block";
  } else {
    alert("Неверный пароль!");
  }
}

// ⏱️ Обновление цифровых часов
function updateClock() {
  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };
  const clockText = now.toLocaleString('ru-RU', options).replace(',', ' —');
  const clockElement = document.getElementById("clock");
  if (clockElement) clockElement.textContent = clockText;
}

// 📁 Отображение/скрытие активной папки в футере
function toggleFooterFolder(show) {
  const footerFolder = document.getElementById("footer-folder");
  if (footerFolder) {
    footerFolder.style.display = show ? "inline-block" : "none";
    footerFolder.classList.toggle("active", show);
  }
}

// 🎥 Управление встроенным видеоплеером
function openVideoPlayer(src) {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("videoElement");
  const source = video.querySelector("source");

  source.src = src;
  video.load();
  modal.style.display = "flex";
}

function closeVideoPlayer() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("videoElement");

  video.pause();
  modal.style.display = "none";
}
