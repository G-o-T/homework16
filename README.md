# homework16

## 1. Что представляют собой формы?

Это набор из элементов управления, размещаемых на Web-странице

## 2. Для чего служат формы?

Формы нужны для сбора данных от пользователя и отправки на сервер.

## 3. Каким типом задаётся поле ввода в форме текста?

тегом input с type="text"

## 4. Какими способами можно обратиться к элементу формы?

Например, по имени элемента через document.forms.form.elements.name, где name - имя элемента формы, а form - имя самой формы
или по индексу document.forms[n].elements[n]

## 5. Какой  JS-код можно указать в атрибуте `action`?

В action указывается ссылка на обработчик, т.е. адрес сервера, на который нужно отправить форму. Это самая распространенная информация. Нашла еще, что в action можно и JS-код указать, но пишут, что для этого обязателен метод post

## 6. Какой тип имеет свойство elements объекта Form?

массивоподобная коллекция (массив)

## 7. Как сделать валидацию номера кредитной карты? 

Через регулярку рекомендуется проверять только очевидное: формат, нет ли символов, кроме цифр, указано ли нужное количество цифр и т.д. + Надо учесть, что бывают разные форматы номеров кредитных карт

Пример регулярки для платежных систем: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/


## 8. Восстановить значения умолчания в полях формы можно только по кнопке reset?

Нет, можно и вручную для каждого поля, но нецелесообразно

## 9. Каким способом можно отправить данные из формы на сервер?

метод submit, cпецкнопка Submit. Пишут еще про событие onsubmit

## 10. Как можно полностью перехватить и обработать javascript-функцией событие submit (отправку данных на сервер)?

Чтобы перехватить отправку формы, вызывают event preventDefault.

## 11. Какие есть недостатки у стандартного способа задания валидации через HTML5?

- плохо настраивается по сравнению с JS-валидацией (например,сообщения об ошибке проявляются заранее, что может сбивать пользователя);
- не поддерживается старыми браузерами
- нельзя кастомизировать сообщение об ошибке
