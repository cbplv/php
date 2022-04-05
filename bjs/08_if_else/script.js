const minValueDefault = 1   /* значения по умолчанию */
const maxValueDefault = 3
let minValue = minValueDefault; /* начальные значения */
let maxValue = maxValueDefault;
let answerNumber = 0;               
let orderNumber = 1;   /* номер попытки */
let gameRun = true; /* триггер активности игры */
let maxPossibleSteps = null; /* число возможныx комбинаций */

let questionRandom = Math.round(Math.random() * 2); /* рандомный выбор фразы */

const orderNumberField = document.getElementById('orderNumberField'); /* выбор элементов для отображения информации */
const answerField = document.getElementById('answerField');
const minV = document.getElementById('inputMin');
const maxV = document.getElementById('inputMax');
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const popup = document.getElementById('popup');
// minV.setAttribute('value', minValue);
// maxV.setAttribute('value', maxValue);


document.getElementById('btnSubmit').addEventListener('click', function () {
    minValue = parseInt(minV.value);
    maxValue = parseInt(maxV.value);
    popup.style.display = 'none';
    gameBegin();
});

document.getElementById("close").addEventListener('click', () => {

     popup.style.display = 'none';

})

function getRandomOptionNumber(depth) {

    if (depth > 0) {
        depth = depth - 1;
    } else {
        depth = 1
    }

    questionRandom = Math.round(Math.random() * depth);
}

function numToString(num, Phrase) {
    let outputNumber = (num < 0) ? '-' : ''; /* метим запись что число отрицательное */
    let outPhrase = Phrase.replace('?', ''); /* удаляем вопросительный знак, в конце добавим (длина строки считается без него)*/
    var zeroToTen = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять'];
    var tenToTwenty = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестьнадцать', 'семьнадцать', 'восемьнадцать', 'девятнадцать']
    var tenners = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто']
    var hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестисот', 'семьсот', 'восемьсот', 'девятьсот']
    
    num = Math.abs(num);
    outputNumber = outPhrase + outputNumber + ' ';

    if (num === 0) {
        outputNumber = outputNumber + 'ноль';
    }
    if (num > 0 && num <= 10) {
        outputNumber = outputNumber + zeroToTen[num];
    } else if (num > 10 && num < 20) {
        outputNumber = outputNumber + tenToTwenty[num % 10];
    } else if (num >= 20 && num <= 99) {
        outputNumber = outputNumber + tenners[parseInt(num / 10)] + ' ' + zeroToTen[num % 10];
    } else if (num >= 100 && num < 999) {
        outputNumber = outputNumber + hundreds[parseInt(num / 100)];
        if (num % 100 > 10 && num % 100 < 20) {
            outputNumber = outputNumber + ' ' + tenToTwenty[num % 100 % 10];
        } else {
            outputNumber = outputNumber + ' ' + tenners[parseInt(num % 100 / 10)] + ' ' + zeroToTen[num % 100 % 10];
        }
    }

    outputNumber = outputNumber.replace('-', 'минус');

    if (outputNumber.length < 20) {
        return outputNumber + '?';
    } else {
        return outPhrase + ' ' + num + '?';
    }
}

function phraseOutput() {

    getRandomOptionNumber(3);

    let outputPhrase = null;

    outputPhrase = (orderNumber === maxPossibleSteps) ? `С вас шоколадка, это число` : null; /* фраза для случая если вариант один */

    if (outputPhrase == null) {
        switch (questionRandom) {
            case 0:
                outputPhrase = `Число #`;
                break;
            case 1:
                outputPhrase = `Вы загадали число`;
                break;
            case 2:
                outputPhrase = `Неужели`;
                break;
        }
    };
    outputPhrase = numToString(answerNumber, outputPhrase);

    return outputPhrase;
};

function gameBegin() {
    // minValue = parseInt(prompt('Минимальное знание числа для игры', minValue));
    // maxValue = parseInt(prompt('Максимальное знание числа для игры', maxValue));
   
    if (isNaN(minValue)) { minValue = minValueDefault } else { minValue = (minValue < -999) ? -999 : minValue };
    if (isNaN(maxValue)) { maxValue = maxValueDefault } else { maxValue = (maxValue > 999) ? 999 : maxValue };

    if (minValue > maxValue) {
        maxValue = [minValue, minValue = maxValue][0]; /*swap values if minValue bigger than maxValue*/
    }

    maxPossibleSteps = (minValue === maxValue) ? 1 : Math.round(1 + Math.log2(maxValue - minValue));

    //alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    orderNumberField.innerText = orderNumber;
    answerField.innerText = phraseOutput();
}

document.getElementById('btnRetry').addEventListener('click', function () {

    minValue = minValueDefault;
    maxValue = maxValueDefault;
    orderNumber = 0;
    // answerField.innerText = '';
    // orderNumber.innerText = '';

    minV.value = '';
    maxV.value = '';

    popup.style.display = '';

    gameBegin();

})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom == 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;

            answerField.innerText = phraseOutput();
        }
    }
    console.log('>'+ minValue +'-'+ maxValue + ' / ' + maxPossibleSteps +' ['+answerNumber+']') ;
})

document.getElementById('btnEqual').addEventListener('click', function () {

    if (gameRun) {
        switch (questionRandom) {
            case 0:
                outputPhrase = `Я всегда угадываю\n\u{1F60E}`;
                break;
            case 1:
                outputPhrase = `Наповал\n\u{1F60E}!`;
                break;
            case 2:
                outputPhrase = `Мой мозг лучше всеx\n\u{1F60E}!!`;
                break;
        }
        answerField.innerText = outputPhrase
        gameRun = false;
    }

})

document.querySelector('#btnLess').addEventListener('click', () => {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;
            answerField.innerText = answerPhrase;

            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = phraseOutput();
        }
    }
    console.log('>'+ minValue +'-'+ maxValue + ' / ' + maxPossibleSteps +' ['+answerNumber+']') ;
})