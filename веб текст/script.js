let currentQuestion = 0;
let answers = {};
let questionsOrder = [];
const totalQuestions = 15; // Общее количество вопросов

// Функция для начала теста
function startTest() {
    // Скрыть главное меню и показать блок с вопросами
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('questions').style.display = 'block';

    // Создать случайный порядок вопросов
    questionsOrder = shuffleQuestions(totalQuestions);

    // Показать первый вопрос
    showNextQuestion();
}

// Функция для перемешивания вопросов
function shuffleQuestions(total) {
    let questionsIndexes = Array.from(Array(total).keys()); // Создаем массив индексов от 0 до total-1
    let shuffledIndexes = [];

    while (questionsIndexes.length > 0) {
        // Выбираем случайный индекс из оставшихся
        let randomIndex = Math.floor(Math.random() * questionsIndexes.length);
        // Добавляем выбранный вопрос в перемешанный порядок
        shuffledIndexes.push(questionsIndexes[randomIndex]);
        // Удаляем выбранный вопрос из списка, чтобы он больше не повторялся
        questionsIndexes.splice(randomIndex, 1);
    }

    return shuffledIndexes;
}

// Функция для показа следующего вопроса
function showNextQuestion() {
    currentQuestion++;
    if (currentQuestion <= totalQuestions) {
        // Получаем текущий индекс вопроса из случайного порядка
        let questionIndex = questionsOrder[currentQuestion - 1];
        // Показываем соответствующий вопрос
        showQuestion(questionIndex);
    } else {
        // Если вопросы закончились, показываем результат
        showResult();
    }
}

// Функция для показа вопроса по индексу
function showQuestion(index) {
    let questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.style.display = 'none';
    });

    let currentQuestionElement = document.getElementById(`question${index + 1}`);
    currentQuestionElement.style.display = 'block';
}

// Функция для ответа на вопрос
function answerQuestion(choice) {
    let currentQuestionIndex = questionsOrder[currentQuestion - 1];
    if (!answers[`question${currentQuestionIndex + 1}`]) {
        answers[`question${currentQuestionIndex + 1}`] = [];
    }
    answers[`question${currentQuestionIndex + 1}`].push(choice);

    // Показать следующий вопрос или результат, если вопросы закончились
    showNextQuestion();
}

// Функция для показа результата теста
function showResult() {
    let result = document.getElementById('colorResult');
    let color = determineColor();
    result.textContent = color;

    document.getElementById('questions').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}

// Функция для определения результата (цвета)
function determineColor() {
    let counts = {
        'а': 0,
        'б': 0,
        'в': 0,
        'г': 0,
        'д': 0
        // Добавьте дополнительные цвета по алфавиту или другим уникальным идентификаторам
    };

    for (let i = 1; i <= totalQuestions; i++) {
        let answersForQuestion = answers[`question${i}`];
        if (answersForQuestion) {
            answersForQuestion.forEach(answer => {
                counts[answer]++;
            });
        }
    }

    // Найти максимальное значение среди всех ответов
    let maxCount = Math.max(...Object.values(counts));

    // Найти все цвета, которые имеют максимальное значение
    let maxColors = Object.keys(counts).filter(color => counts[color] === maxCount);

    // Вернуть результат в зависимости от максимальных значений
    if (maxColors.length === 1) {
        return getColorDescription(maxColors[0]);
    } else {
        // Если есть несколько цветов с одинаковым максимальным значением, вернуть сообщение
        return 'Результаты теста показывают смешение нескольких цветов. Попробуйте пройти тест еще раз!';
    }
}

// Функция для возвращения описания цвета

function getColorDescription(color) {
    switch (color) {
        case 'а':
            return 'Красный. Вы энергичны и полны сил.';
        case 'б':
            return 'Голубой. Вы спокойны и сосредоточены.';
        case 'в':
            return 'Зеленый. Вам требуется больше спокойствия и умиротворения.';
        case 'г':
            return 'Желтый. Вас вдохновляют яркие и солнечные дни.';
        case 'д':
            return 'Фиолетовый. Вы творческая натура и любите вдохновение.';
        case 'е':
            return 'Оранжевый. Вы обладаете ярким характером и оптимизмом.';
        case 'ж':
            return 'Серый. Ваш стиль - минимализм и практичность.';
        case 'з':
            return 'Розовый. Вы чувствительны и умеете наслаждаться моментом.';
        case 'и':
            return 'Коричневый. Вы земли и практичны в своих решениях.';
        case 'к':
            return 'Белый. Вы открыты и чистосердечны в общении с окружающими.';
        case 'л':
            return 'Черный. Ваш стиль - загадочность и глубина.';
        case 'м':
            return 'Золотой. Вы стремитесь к лучшему и готовы к переменам.';
        case 'н':
            return 'Серебряный. Вы стремитесь к гармонии и уверены в себе.';
        case 'о':
            return 'Бирюзовый. Вы вдохновляетесь природой и мечтательны.';
        case 'п':
            return 'Бордовый. Вы страстны и чувственны в своих переживаниях.';
        default:
            return 'Цвет не определен.';
    }
}
