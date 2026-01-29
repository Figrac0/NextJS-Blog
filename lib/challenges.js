export const challenges = [
    {
        id: 1,
        title: "Сумма чисел",
        code: `function calculateSum(a, b) {
    // Вставьте правильный оператор
    return a ___ b;
}`,
        slots: [{ id: "s1", correct: "+" }],
        elements: [
            { id: "e1", type: "operator", value: "+" },
            { id: "e2", type: "operator", value: "-" },
            { id: "e3", type: "operator", value: "*" },
            { id: "e4", type: "operator", value: "/" },
        ],
        hint: "Для сложения двух чисел используйте оператор плюс",
    },
    {
        id: 2,
        title: "Проверка четности",
        code: `function isEven(num) {
    // Проверьте, четное ли число
    return num % 2 ___ 0;
}`,
        slots: [{ id: "s1", correct: "===" }],
        elements: [
            { id: "e1", type: "operator", value: "===" },
            { id: "e2", type: "operator", value: "!==" },
            { id: "e3", type: "operator", value: ">" },
            { id: "e4", type: "operator", value: "<" },
        ],
        hint: "Для проверки равенства используйте оператор строгого равенства",
    },
    {
        id: 3,
        title: "Цикл for",
        code: `function countToFive() {
    let result = [];
    for (let i = 1; i ___ 5; i++) {
        result.push(i);
    }
    return result;
}`,
        slots: [{ id: "s1", correct: "<=" }],
        elements: [
            { id: "e1", type: "operator", value: "<=" },
            { id: "e2", type: "operator", value: ">=" },
            { id: "e3", type: "operator", value: "==" },
            { id: "e4", type: "operator", value: "!=" },
        ],
        hint: "Цикл должен продолжаться пока i меньше или равно 5",
    },
    {
        id: 4,
        title: "Метод массива",
        code: `function doubleNumbers(arr) {
    // Удвойте все элементы массива
    return arr.___(num => num * 2);
}`,
        slots: [{ id: "s1", correct: "map" }],
        elements: [
            { id: "e1", type: "method", value: "map" },
            { id: "e2", type: "method", value: "filter" },
            { id: "e3", type: "method", value: "reduce" },
            { id: "e4", type: "method", value: "forEach" },
        ],
        hint: "map создает новый массив с результатами вызова функции для каждого элемента",
    },
    {
        id: 5,
        title: "Тернарный оператор",
        code: `function checkAge(age) {
    // Используйте тернарный оператор
    return age >= 18 ___ "Взрослый" ___ "Ребенок";
}`,
        slots: [
            { id: "s1", correct: "?" },
            { id: "s2", correct: ":" },
        ],
        elements: [
            { id: "e1", type: "operator", value: "?" },
            { id: "e2", type: "operator", value: ":" },
            { id: "e3", type: "operator", value: "&&" },
            { id: "e4", type: "operator", value: "||" },
        ],
        hint: "Тернарный оператор имеет формат: условие ? значение1 : значение2",
    },
    {
        id: 6,
        title: "Объявление переменной",
        code: `// Объявите переменную для хранения имени пользователя
___ userName = "Алексей";`,
        slots: [{ id: "s1", correct: "const" }],
        elements: [
            { id: "e1", type: "keyword", value: "const" },
            { id: "e2", type: "keyword", value: "let" },
            { id: "e3", type: "keyword", value: "var" },
            { id: "e4", type: "keyword", value: "function" },
        ],
        hint: "Для объявления константной переменной используйте const",
    },
    {
        id: 7,
        title: "Условие if-else",
        code: `function checkTemperature(temp) {
    if (temp > 25) {
        return "Жарко";
    } ___ (temp > 15) {
        return "Тепло";
    } else {
        return "Прохладно";
    }
}`,
        slots: [{ id: "s1", correct: "else if" }],
        elements: [
            { id: "e1", type: "keyword", value: "else if" },
            { id: "e2", type: "keyword", value: "if else" },
            { id: "e3", type: "keyword", value: "elseif" },
            { id: "e4", type: "keyword", value: "case" },
        ],
        hint: "Для дополнительного условия используйте else if",
    },
    {
        id: 8,
        title: "Доступ к свойству объекта",
        code: `const user = {
    name: "Мария",
    age: 25
};

// Получите имя пользователя
const userName = user.___;`,
        slots: [{ id: "s1", correct: "name" }],
        elements: [
            { id: "e1", type: "property", value: "name" },
            { id: "e2", type: "property", value: "age" },
            { id: "e3", type: "property", value: "user" },
            { id: "e4", type: "property", value: "getName" },
        ],
        hint: "Для доступа к свойству объекта используйте точечную нотацию",
    },
    {
        id: 9,
        title: "Функция стрелка",
        code: `// Преобразуйте в стрелочную функцию
const multiply = function(a, b) {
    return a * b;
};

const multiply = (a, b) ___ a * b;`,
        slots: [{ id: "s1", correct: "=>" }],
        elements: [
            { id: "e1", type: "operator", value: "=>" },
            { id: "e2", type: "operator", value: "->" },
            { id: "e3", type: "operator", value: ">>" },
            { id: "e4", type: "operator", value: "==" },
        ],
        hint: "Стрелочная функция использует оператор =>",
    },
    {
        id: 10,
        title: "Цикл while",
        code: `function countDown(n) {
    let result = [];
    let i = n;
    
    // Заполните условие цикла
    while (i ___) {
        result.push(i);
        i--;
    }
    
    return result;
}`,
        slots: [{ id: "s1", correct: "> 0" }],
        elements: [
            { id: "e1", type: "expression", value: "> 0" },
            { id: "e2", type: "expression", value: "< 0" },
            { id: "e3", type: "expression", value: ">= n" },
            { id: "e4", type: "expression", value: "=== n" },
        ],
        hint: "Цикл должен выполняться пока i больше 0",
    },
    {
        id: 11,
        title: "Оператор switch",
        code: `function getDayName(day) {
    switch(day) {
        ___ 1:
            return "Понедельник";
        case 2:
            return "Вторник";
        default:
            return "Неизвестный день";
    }
}`,
        slots: [{ id: "s1", correct: "case" }],
        elements: [
            { id: "e1", type: "keyword", value: "case" },
            { id: "e2", type: "keyword", value: "if" },
            { id: "e3", type: "keyword", value: "when" },
            { id: "e4", type: "keyword", value: "check" },
        ],
        hint: "В операторе switch для каждого варианта используйте case",
    },
    {
        id: 12,
        title: "Работа с массивом",
        code: `const fruits = ["яблоко", "банан", "апельсин"];

// Добавьте элемент в конец массива
fruits.___("виноград");`,
        slots: [{ id: "s1", correct: "push" }],
        elements: [
            { id: "e1", type: "method", value: "push" },
            { id: "e2", type: "method", value: "pop" },
            { id: "e3", type: "method", value: "shift" },
            { id: "e4", type: "method", value: "unshift" },
        ],
        hint: "Метод push добавляет элемент в конец массива",
    },
    {
        id: 13,
        title: "Логическое И",
        code: `function canDrive(age, hasLicense) {
    // Проверьте два условия
    return age >= 18 ___ hasLicense;
}`,
        slots: [{ id: "s1", correct: "&&" }],
        elements: [
            { id: "e1", type: "operator", value: "&&" },
            { id: "e2", type: "operator", value: "||" },
            { id: "e3", type: "operator", value: "??" },
            { id: "e4", type: "operator", value: "!" },
        ],
        hint: "Для проверки двух условий одновременно используйте оператор И (&&)",
    },
    {
        id: 14,
        title: "Конкатенация строк",
        code: `function greet(name) {
    // Объедините строки
    return "Привет, " ___ name ___ "!";
}`,
        slots: [
            { id: "s1", correct: "+" },
            { id: "s2", correct: "+" },
        ],
        elements: [
            { id: "e1", type: "operator", value: "+" },
            { id: "e2", type: "operator", value: "&" },
            { id: "e3", type: "operator", value: "concat" },
            { id: "e4", type: "operator", value: "join" },
        ],
        hint: "Для объединения строк используйте оператор +",
    },
    {
        id: 15,
        title: "Оператор отрицания",
        code: `function isNotZero(num) {
    // Проверьте, что число НЕ равно нулю
    return num ___ 0;
}`,
        slots: [{ id: "s1", correct: "!==" }],
        elements: [
            { id: "e1", type: "operator", value: "!==" },
            { id: "e2", type: "operator", value: "===" },
            { id: "e3", type: "operator", value: ">" },
            { id: "e4", type: "operator", value: "<" },
        ],
        hint: "Для проверки неравенства используйте оператор строгого неравенства",
    },
];
