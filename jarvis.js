// Элементы DOM
const userInput = document.getElementById("user-input");
const output = document.getElementById("output");

// Функция для обработки ввода пользователя
function handleUserInput() {
  const inputText = userInput.value.toLowerCase();
  let response = "Извините, не могу выполнить эту команду.";
  if (inputText.includes("Полная информация обо мне")) {
   response = "Александр Давитян , родился в Грузии в 2007 году 17 ноября";
 }
 else if (inputText.includes("как дела")) {
    response = "У меня всё отлично. А как у вас?";
  } else if (inputText.includes("Как меня зовут ?")) {
    response = "Александр Давитян";
  }


  output.innerHTML = response;
  userInput.value = "";
}

// Слушатель события для кнопки "Отправить"
const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", handleUserInput);

// Слушатель события для клавиши Enter
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleUserInput();
  }
});

const timeButton = document.getElementById("time-button");
timeButton.addEventListener("click", function() {
  const currentTime = getCurrentTime();
  output.innerHTML = `Текущее время: ${currentTime}`;
});

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  return timeString;
}

const apiKey = 'Ваш_API_ключ';
const searchEngineId = 'Идентификатор_поисковой_машины';

function performSearch(query) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = 'Идет поиск...';

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${query}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    searchResults.innerHTML = ''; // Очистить предыдущие результаты

    if (data.items && data.items.length > 0) {
      data.items.forEach(item => {
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
        <a href="${item.link}" target="_blank">${item.title}</a><br>
        ${item.snippet}<br><br>
        `;
        searchResults.appendChild(resultDiv);
      });
    } else {
      searchResults.innerHTML = 'По вашему запросу ничего не найдено.';
    }
  })
  .catch(error => {
    searchResults.innerHTML = 'Ошибка при выполнении поиска.';
  });
}
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function() {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  if (query) {
    performSearch(query);
  }
});



// Элементы DOM
const voiceInputButton = document.getElementById("voice-input-button");

// Проверка поддержки Web Speech API
if ("SpeechRecognition" in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "ru-RU"; // Устанавливаем язык распознавания

  voiceInputButton.addEventListener("click", function () {
    recognition.start();
  });

  recognition.onresult = function (event) {
    const inputText = event.results[0][0].transcript.toLowerCase();
    handleUserInput(inputText); // Передаем распознанный текст для обработки
  };

  recognition.onend = function () {
    // Завершение распознавания, можно включить новый ввод
  };
} else {
  // Браузер не поддерживает Web Speech API
  voiceInputButton.disabled = true;
  voiceInputButton.innerHTML = "Голосовой ввод не поддерживается";
}

function speak(text) {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }
}

// Пример использования
speak("Привет! Как я могу помочь вам?");
