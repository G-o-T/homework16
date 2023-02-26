// ***** Задание под звездочкой (тренировка регулярных выражений)**

// 1. Определите, что год находится в интервале *от 2000 до 2100* с помощью только регулярного выражения.

function isDesiredYear(year) {
    return /^2(0\d\d|100)$/.test(year);
}

isDesiredYear(2007);
isDesiredYear(2109);


// 2. Удалите **одной регуляркой** все слова из предложения, содержащие *две одинаковые, следующие друг за другом буквы.*
function deleteWordWithDoubleRunningLetters(str) {
    let regExp = /\p{sc=Common}*\p{L}*(\p{L})\1\p{L}*\p{sc=Common}*/gu;

    return str.replace(regExp, " ");
}

deleteWordWithDoubleRunningLetters('Чаасто встречаете наа различных сервисах трребование придумать сложжный пароль'); // встречаете различных сервисах придумать пароль


// 3. Удалите **одной регуляркой** *все повторяющиеся слова* из строки.

function deleteDoubleRunningWords(str) {
    let regExp =/\p{sc=Common}(\p{L}+)\s+\1/gu;

    return str.replace(regExp, " $1"); 
}

deleteDoubleRunningWords('ааву ааа ааа ап');

// 4. Решите **предыдущую задачу** с учётом того, что слово может повторяться **много раз**.

function deleteMultiRunningLatWords(str) {

    let regExpLat = /\b(\w+)\b(?:\s+\1\b)+/g;

    return str.replace(regExpLat, "$1"); 
}

deleteMultiRunningLatWords('vbn mmm mmm mmm mmm kj');

// Вот тут косяк. Очень хочется понять, как это реализовать

function deleteMultiRunningWords(str) {

    let regExp =/\p{sc=Common}(\p{L}+)\p{sc=Common}(?:\s+\1\p{sc=Common})+/gu;

    return str.replace(regExp, "$1"); 
}

deleteMultiRunningWords('ааву ааа ааа ааа ааа ап');




