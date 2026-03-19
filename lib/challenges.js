const CHALLENGE_DEFINITIONS = [
    {
        id: 1,
        slots: [{ id: "s1", correct: "+" }],
        elements: [
            { id: "e1", type: "operator", value: "+" },
            { id: "e2", type: "operator", value: "-" },
            { id: "e3", type: "operator", value: "*" },
            { id: "e4", type: "operator", value: "/" },
        ],
        en: {
            title: "Sum of numbers",
            code: `function calculateSum(a, b) {
    // Insert the correct operator
    return a ___ b;
}`,
            hint: "Use the plus operator to add two numbers.",
        },
        ru: {
            title: "Сумма чисел",
            code: `function calculateSum(a, b) {
    // Вставьте правильный оператор
    return a ___ b;
}`,
            hint: "Для сложения двух чисел используйте оператор плюс.",
        },
    },
    {
        id: 2,
        slots: [{ id: "s1", correct: "===" }],
        elements: [
            { id: "e1", type: "operator", value: "===" },
            { id: "e2", type: "operator", value: "!==" },
            { id: "e3", type: "operator", value: ">" },
            { id: "e4", type: "operator", value: "<" },
        ],
        en: {
            title: "Even check",
            code: `function isEven(num) {
    // Check whether the number is even
    return num % 2 ___ 0;
}`,
            hint: "Use strict equality to compare the result with zero.",
        },
        ru: {
            title: "Проверка четности",
            code: `function isEven(num) {
    // Проверьте, четное ли число
    return num % 2 ___ 0;
}`,
            hint: "Для проверки равенства используйте оператор строгого равенства.",
        },
    },
    {
        id: 3,
        slots: [{ id: "s1", correct: "<=" }],
        elements: [
            { id: "e1", type: "operator", value: "<=" },
            { id: "e2", type: "operator", value: ">=" },
            { id: "e3", type: "operator", value: "==" },
            { id: "e4", type: "operator", value: "!=" },
        ],
        en: {
            title: "for loop",
            code: `function countToFive() {
    let result = [];
    for (let i = 1; i ___ 5; i++) {
        result.push(i);
    }
    return result;
}`,
            hint: "The loop should continue while i is less than or equal to 5.",
        },
        ru: {
            title: "Цикл for",
            code: `function countToFive() {
    let result = [];
    for (let i = 1; i ___ 5; i++) {
        result.push(i);
    }
    return result;
}`,
            hint: "Цикл должен продолжаться, пока i меньше или равно 5.",
        },
    },
    {
        id: 4,
        slots: [{ id: "s1", correct: "map" }],
        elements: [
            { id: "e1", type: "method", value: "map" },
            { id: "e2", type: "method", value: "filter" },
            { id: "e3", type: "method", value: "reduce" },
            { id: "e4", type: "method", value: "forEach" },
        ],
        en: {
            title: "Array method",
            code: `function doubleNumbers(arr) {
    // Double every element in the array
    return arr.___(num => num * 2);
}`,
            hint: "map creates a new array from the results of each function call.",
        },
        ru: {
            title: "Метод массива",
            code: `function doubleNumbers(arr) {
    // Удвойте все элементы массива
    return arr.___(num => num * 2);
}`,
            hint: "map создает новый массив с результатами вызова функции для каждого элемента.",
        },
    },
    {
        id: 5,
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
        en: {
            title: "Ternary operator",
            code: `function checkAge(age) {
    // Use the ternary operator
    return age >= 18 ___ "Adult" ___ "Child";
}`,
            hint: "The ternary operator has the form: condition ? value1 : value2.",
        },
        ru: {
            title: "Тернарный оператор",
            code: `function checkAge(age) {
    // Используйте тернарный оператор
    return age >= 18 ___ "Взрослый" ___ "Ребенок";
}`,
            hint: "Тернарный оператор имеет формат: условие ? значение1 : значение2.",
        },
    },
    {
        id: 6,
        slots: [{ id: "s1", correct: "const" }],
        elements: [
            { id: "e1", type: "keyword", value: "const" },
            { id: "e2", type: "keyword", value: "let" },
            { id: "e3", type: "keyword", value: "var" },
            { id: "e4", type: "keyword", value: "function" },
        ],
        en: {
            title: "Variable declaration",
            code: `// Declare a variable to store the user name
___ userName = "Alex";`,
            hint: "Use const to declare a constant variable.",
        },
        ru: {
            title: "Объявление переменной",
            code: `// Объявите переменную для хранения имени пользователя
___ userName = "Алексей";`,
            hint: "Для объявления константной переменной используйте const.",
        },
    },
    {
        id: 7,
        slots: [{ id: "s1", correct: "else if" }],
        elements: [
            { id: "e1", type: "keyword", value: "else if" },
            { id: "e2", type: "keyword", value: "if else" },
            { id: "e3", type: "keyword", value: "elseif" },
            { id: "e4", type: "keyword", value: "case" },
        ],
        en: {
            title: "if-else condition",
            code: `function checkTemperature(temp) {
    if (temp > 25) {
        return "Hot";
    } ___ (temp > 15) {
        return "Warm";
    } else {
        return "Cool";
    }
}`,
            hint: "Use else if to add an extra condition branch.",
        },
        ru: {
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
            hint: "Для дополнительного условия используйте else if.",
        },
    },
    {
        id: 8,
        slots: [{ id: "s1", correct: "name" }],
        elements: [
            { id: "e1", type: "property", value: "name" },
            { id: "e2", type: "property", value: "age" },
            { id: "e3", type: "property", value: "user" },
            { id: "e4", type: "property", value: "getName" },
        ],
        en: {
            title: "Object property access",
            code: `const user = {
    name: "Maria",
    age: 25
};

// Get the user's name
const userName = user.___;`,
            hint: "Use dot notation to access the object's property.",
        },
        ru: {
            title: "Доступ к свойству объекта",
            code: `const user = {
    name: "Мария",
    age: 25
};

// Получите имя пользователя
const userName = user.___;`,
            hint: "Для доступа к свойству объекта используйте точечную нотацию.",
        },
    },
    {
        id: 9,
        slots: [{ id: "s1", correct: "=>" }],
        elements: [
            { id: "e1", type: "operator", value: "=>" },
            { id: "e2", type: "operator", value: "->" },
            { id: "e3", type: "operator", value: ">>" },
            { id: "e4", type: "operator", value: "==" },
        ],
        en: {
            title: "Arrow function",
            code: `// Convert this to an arrow function
const multiply = function(a, b) {
    return a * b;
};

const multiplyArrow = (a, b) ___ a * b;`,
            hint: "Arrow functions use the => operator.",
        },
        ru: {
            title: "Стрелочная функция",
            code: `// Преобразуйте в стрелочную функцию
const multiply = function(a, b) {
    return a * b;
};

const multiplyArrow = (a, b) ___ a * b;`,
            hint: "Стрелочная функция использует оператор =>.",
        },
    },
    {
        id: 10,
        slots: [{ id: "s1", correct: "> 0" }],
        elements: [
            { id: "e1", type: "expression", value: "> 0" },
            { id: "e2", type: "expression", value: "< 0" },
            { id: "e3", type: "expression", value: ">= n" },
            { id: "e4", type: "expression", value: "=== n" },
        ],
        en: {
            title: "while loop",
            code: `function countDown(n) {
    let result = [];
    let i = n;

    // Complete the loop condition
    while (i ___) {
        result.push(i);
        i--;
    }

    return result;
}`,
            hint: "The loop should keep running while i is greater than 0.",
        },
        ru: {
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
            hint: "Цикл должен выполняться, пока i больше 0.",
        },
    },
    {
        id: 11,
        slots: [{ id: "s1", correct: "case" }],
        elements: [
            { id: "e1", type: "keyword", value: "case" },
            { id: "e2", type: "keyword", value: "if" },
            { id: "e3", type: "keyword", value: "when" },
            { id: "e4", type: "keyword", value: "check" },
        ],
        en: {
            title: "switch statement",
            code: `function getDayName(day) {
    switch (day) {
        ___ 1:
            return "Monday";
        case 2:
            return "Tuesday";
        default:
            return "Unknown day";
    }
}`,
            hint: "Use case for each option inside a switch statement.",
        },
        ru: {
            title: "Оператор switch",
            code: `function getDayName(day) {
    switch (day) {
        ___ 1:
            return "Понедельник";
        case 2:
            return "Вторник";
        default:
            return "Неизвестный день";
    }
}`,
            hint: "В операторе switch для каждого варианта используйте case.",
        },
    },
    {
        id: 12,
        slots: [{ id: "s1", correct: "push" }],
        elements: [
            { id: "e1", type: "method", value: "push" },
            { id: "e2", type: "method", value: "pop" },
            { id: "e3", type: "method", value: "shift" },
            { id: "e4", type: "method", value: "unshift" },
        ],
        en: {
            title: "Working with arrays",
            code: `const fruits = ["apple", "banana", "orange"];

// Add an item to the end of the array
fruits.___("grape");`,
            hint: "push adds a new item to the end of the array.",
        },
        ru: {
            title: "Работа с массивом",
            code: `const fruits = ["яблоко", "банан", "апельсин"];

// Добавьте элемент в конец массива
fruits.___("виноград");`,
            hint: "Метод push добавляет элемент в конец массива.",
        },
    },
    {
        id: 13,
        slots: [{ id: "s1", correct: "&&" }],
        elements: [
            { id: "e1", type: "operator", value: "&&" },
            { id: "e2", type: "operator", value: "||" },
            { id: "e3", type: "operator", value: "??" },
            { id: "e4", type: "operator", value: "!" },
        ],
        en: {
            title: "Logical AND",
            code: `function canDrive(age, hasLicense) {
    // Check two conditions
    return age >= 18 ___ hasLicense;
}`,
            hint: "Use && when both conditions must be true.",
        },
        ru: {
            title: "Логическое И",
            code: `function canDrive(age, hasLicense) {
    // Проверьте два условия
    return age >= 18 ___ hasLicense;
}`,
            hint: "Для проверки двух условий одновременно используйте оператор И (&&).",
        },
    },
    {
        id: 14,
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
        en: {
            title: "String concatenation",
            code: `function greet(name) {
    // Join the strings together
    return "Hello, " ___ name ___ "!";
}`,
            hint: "Use + to concatenate strings.",
        },
        ru: {
            title: "Конкатенация строк",
            code: `function greet(name) {
    // Объедините строки
    return "Привет, " ___ name ___ "!";
}`,
            hint: "Для объединения строк используйте оператор +.",
        },
    },
    {
        id: 15,
        slots: [{ id: "s1", correct: "!==" }],
        elements: [
            { id: "e1", type: "operator", value: "!==" },
            { id: "e2", type: "operator", value: "===" },
            { id: "e3", type: "operator", value: ">" },
            { id: "e4", type: "operator", value: "<" },
        ],
        en: {
            title: "Inequality operator",
            code: `function isNotZero(num) {
    // Check that the number is NOT equal to zero
    return num ___ 0;
}`,
            hint: "Use strict inequality when values must not be equal.",
        },
        ru: {
            title: "Оператор отрицания",
            code: `function isNotZero(num) {
    // Проверьте, что число НЕ равно нулю
    return num ___ 0;
}`,
            hint: "Для проверки неравенства используйте оператор строгого неравенства.",
        },
    },
];

export function getChallenges(locale = "en") {
    const normalizedLocale = locale === "ru" ? "ru" : "en";

    return CHALLENGE_DEFINITIONS.map(({ en, ru, slots, elements, ...rest }) => ({
        ...rest,
        ...(normalizedLocale === "ru" ? ru : en),
        slots: slots.map((slot) => ({ ...slot })),
        elements: elements.map((element) => ({ ...element })),
    }));
}

export const challenges = getChallenges("en");
