let trademarks = ['Jaguar', 'Mazda', 'Opel', 'Renault'];

let form = document.forms.form;
let btnCalc = document.querySelector('.btn-calc');
let btnRemover = document.querySelector('.btn-remover');
let brand = form.elements.brand;
let resultField = document.querySelector('.result-field');
let priceField = document.getElementById('price');
let modelList = form.elements.model;

let models = [
    ['I-Pace', 'E-Pace', 'F-Type'],
    ['CX-3', 'CX-5', 'CX-9'],
    ['Astra', 'Corsa', 'Mokka'],
    ['Arkana', 'Captur', 'Megane', 'Scenic']
];

function createModelOptions(m) {
    modelList.replaceChildren();

    for (let i = 0; i < m.length; i++) {
        let option = document.createElement('option');
        option.value = m[i];
        option.innerHTML = m[i];
        modelList.appendChild(option);
    }
}

function fillModelsList(trm) {
    if (trm == trademarks[0]) {
        createModelOptions(models[0]);
    } else if (trm == trademarks[1]) {
        createModelOptions(models[1]);
    } else if (trm == trademarks[2]) {
        createModelOptions(models[2]);
    } else if (trm == trademarks[3]) {
        createModelOptions(models[3]);
    }
}

brand.addEventListener('change', () => {
    fillModelsList(brand.value);
})


let data = [
    [
        {
            model: 'I-Pace',
            startPrice: 72000,
        }, 
        {
            model: 'E-Pace',
            startPrice: 35900,
        },
        {
            model: 'F-Type',
            startPrice: 115000,
        }
    ],

    [
        {
            model: 'CX-3',
            startPrice: 23500,
        }, 
        {
            model: 'CX-5',
            startPrice: 40400,
        },
        {
            model: 'CX-9',
            startPrice: 48800,
        }
    ],

[
    {
        model: 'Astra',
        startPrice: 12500,
    }, 
    {
        model: 'Corsa',
        startPrice: 11300,
    },
    {
        model: 'Mokka',
        startPrice: 34800,
    }
], 

[
    {
        model: 'Arkana',
        startPrice: 21200,
    }, 
    {
        model: 'Captur',
        startPrice: 19700,
    },
    {
        model: 'Megane',
        startPrice: 14000,
    },
    {
        model: 'Scenic',
        startPrice: 17400,
    }
]
];

let carStates = document.querySelector('.states');
let owners = document.getElementById('owners');
let carState;

//Функция показывает или прячет блок с выбором владельца авто
function showAndHideOwners() {
    carState = document.querySelector('input[name="state"]:checked').value;
    if (carState === 'old') {
        owners.classList.remove('inert'); 
    } else if (carState === 'new') {
        owners.classList.add('inert'); 
    }
};

carStates.addEventListener('click', showAndHideOwners);

let mainOptions = [];

//Функция определяет выбранные опции, кроме марки, модели
function defineMainOptions() {
    mainOptions[0] = document.querySelector('input[name="state"]:checked').value;
    mainOptions[1] = document.querySelector('input[name="owner"]:checked').value;
    mainOptions[2] = document.querySelector('input[name="fuel"]:checked').value;
    mainOptions[3] = document.querySelector('input[name="payment"]:checked').value;
    return mainOptions;
}

let quotient = {
    new : 1,
    old : 0, 
    few : 0.7,
    many : 0.5,
    petrol : 0,
    diesel : 0.08,
    gas : 0.15,
    electricity : 0.3,
    card : 0,
    cash : -0.06,
    entity : 0.2,
}

let currentModel;
let startPrice;
let engineCapacity = form.elements.capacity;

function defineStartPrice() {
    let i;

    if (brand.value == trademarks[0]) {
        i = 0;
    } else if (brand.value == trademarks[1]) {
        i = 1;
    } else if (brand.value == trademarks[2]) {
        i = 2;
    } else if (brand.value == trademarks[3]) {
        i = 3;
    }

    data[i].forEach(el => {
        if (el.model === currentModel) {
         return startPrice = el.startPrice;  
        }
    });
}

let mainOptionsPrice;
let engineCapacityPrice;
let addOptionsPrice;

function calcMainOptionPrice() {
    let mainOptionsPrices = [];
    currentModel = modelList.value;
    defineStartPrice();
    defineMainOptions();
    
    mainOptions.forEach(item => {
        for (key in quotient) {
            if (item == key) {
                mainOptionsPrices.push(startPrice * quotient[key]);
            }
        }
    });

    let mainOptionsPricesSum = mainOptionsPrices.reduce((acc, item) => acc + item, 0);

    if (mainOptions[0] == 'new') {
        mainOptionsPrice = mainOptionsPricesSum - mainOptionsPrices[1];
    } else if (mainOptions[0] == 'old') {
        mainOptionsPrice = mainOptionsPricesSum - mainOptionsPrices[0];
    } 

    return mainOptionsPrice;
}

function  defineEngineCapacityPrice() {

    if (engineCapacity.value < 2) {
         engineCapacityPrice = startPrice * -0.01;
    } else if (engineCapacity.value == 2) {
        engineCapacityPrice = startPrice * 0;
    } else {
        engineCapacityPrice = startPrice * 0.04;
    };

    return  engineCapacityPrice;
}
let addOptVals;

function defineAddOptions() {
    addOptVals = [];
    let additionalOptions = document.querySelectorAll('input[type="checkbox"]:checked');

    for (addOpt of additionalOptions) {
        addOptVals.push(addOpt.value);
    }
    return addOptVals;
}

let addQuotient = {
    ABS : 0.03,
    ESP : 0.05, 
    immobilizer : 0.07,
    signalling : 0.05,
    disk : 0.1,
    railing : 0.009,
    hitch : 0.08,
    rainSensor : 0.007,
    parkingSensors : 0.06,
    airbag : 0.08,
    rearViewCamera : 0.02,
}

let addOptionsPrices;

function defineAddPrice() {

    addOptionsPrices = [];
    defineAddOptions();

    addOptVals.forEach(item => {
        for (key in addQuotient) {
            if (item == key) {
                addOptionsPrices.push(startPrice * addQuotient[key]);
            }
        }
    });

    let addOptionsPricesSum = addOptionsPrices.reduce((acc, item) => acc + item, 0);

    if (addOptVals == []) {
        addOptionsPrice = 0;
    } else {
        addOptionsPrice = addOptionsPricesSum;
    }

    return addOptionsPrice;

}



let totalPrice;

function calcPrice() {
    calcMainOptionPrice();
    defineAddPrice();
    defineEngineCapacityPrice();

    totalPrice = mainOptionsPrice + engineCapacityPrice + addOptionsPrice;

    return totalPrice;
}


function showPrice() {
    priceField.classList.remove('inert');
    calcPrice();
    let priceValue = document.querySelector('.price__value');
    priceValue.innerHTML = `${totalPrice} USD`;
}

engineCapacity.addEventListener('click', () => {
    removeErrorStyle(engineCapacity);
}); 

brand.addEventListener('click', () => {
    removeErrorStyle(brand);
}); 

model.addEventListener('click', () => {
    removeErrorStyle(modelList);
}); 

let errorsList = [];

let emptyModel = 'Не заполнены все обязательные поля формы. Выберите модель авто';
let emptyBrand = 'Не заполнены все обязательные поля формы. Выберите марку авто';
let emptyError = 'Не заполнены все обязательные поля формы. Введите мощность двигателя';
let minValueError = 'Указанная мощность двигателя меньше допустимой. Введите корректное значение';
let maxValueError = 'Указанная мощность двигателя больше допустимой. Введите корректное значение';

function createError(errorType) {
    let errorText = document.createElement('div');
    errorText.classList.add('error');
    errorText.innerHTML = errorType;
    resultField.append(errorText);
}

function addErrorStyle(tag) {
    tag.classList.add('error-style');
}

let errorsNum = 0;
function checkErrors() {
    let validityCapacity = engineCapacity.validity;

    if (validityCapacity.valueMissing) {
        addErrorStyle(engineCapacity);
        createError(emptyError);
        errorsNum++;
    } else if (validityCapacity.rangeUnderflow) {
        addErrorStyle(engineCapacity);
        createError(minValueError);
        errorsNum++;
    } else if (validityCapacity.rangeOverflow) {
        addErrorStyle(engineCapacity);
        createError(maxValueError);
        errorsNum++;
    } 
    
    if (brand.value == 'default') {
        addErrorStyle(brand);
        createError(emptyBrand);
        errorsNum++;
    }

    if (modelList.value == 'default') {
        addErrorStyle(modelList);
        createError(emptyModel);
        errorsNum++;
    } 
    return errorsNum;
}

btnCalc.addEventListener('click', (event) => {
    event.preventDefault();
    errorsNum = 0;
    cleanResultInfo();
    checkErrors();
    if (!errorsNum) {
        totalPrice = 0;
        showPrice();
    }
});

function cleanResultInfo() {
    removeErrorStyle(engineCapacity);
    removeErrorStyle(brand);
    removeErrorStyle(modelList);
    cleanResultField();
    hidePrice();
}

function removeErrorStyle(tag) {
    tag.classList.remove('error-style');    
}

function cleanResultField() {
    resultField.replaceChildren();
}

function hidePrice() {
    priceField.classList.add('inert');
}

btnRemover.addEventListener('click', (event) => {
    event.preventDefault();
    form.reset();
    cleanResultInfo();
    owners.classList.add('inert'); 
    modelList.replaceChildren();
});


