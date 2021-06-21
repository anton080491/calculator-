'use strict';

//left side of the program

let startBtn = document.getElementById('start'),
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalexpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),

    chooseIncome = document.querySelector('.choose-income'),
    savings = document.querySelector('#savings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),

    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),

    //right side of the program

    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0];





let money, time;



startBtn.addEventListener('click', function () {
    daybudgetValue.textContent = '';
    time = prompt("Введите дату в формате YYYY-MM-DD", "YYYY-MM-DD");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == "" || typeof (money) == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        if (typeof (a) === "string" && typeof (a) != null && typeof (b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b; // если берем переменную а в [] - она выводит любую строку которая была введена пользователем
            sum += +b;
        } else {
            console.log("something wrong!");
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalexpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Очень мало";
        } else if (appData.moneyPerDay <= 1000) {
            levelValue.textContent = "Нормально";
        } else if (appData.moneyPerDay > 1000) {
            levelValue.textContent = "Более чем хорошо";
        } else {
            console.log("Что-то не так");
        }
    } else {
        daybudgetValue.textContent = 'Нажмите кнопку "Начать расчет" и введите месячный бюджет';
    }

});

chooseIncome.addEventListener('change', function () {
    let a = chooseIncome.value;
    if (isNaN(a) && a != null && a != "") {
        console.log("okey");
    } else {
        alert("введите правильные данные! (перечислите через запятую)");
    }

    appData.income = a.split(',');
    incomeValue.textContent = appData.income;

});

savings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        if ((isNaN(sum) || sum.length > 10 || typeof (sum) == null || sum == "") && (isNaN(percent) || percent.length > 10 || typeof (percent) == null || percent == "")) {
            appData.monthIncome = sum / 100 / 12 * percent;
            appData.yearIncome = sum / 100 * percent;

            monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
        } else {
            alert('111');
        }
    }
});

choosePercent.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});




let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ""),
                b = prompt("Во сколько обойдется?", "");

            if (typeof (a) === "string" && typeof (a) != null && typeof (b) != null && a != "" && b != "" && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b; // если берем переменную а в [] - она выводит любую строку которая была введена пользователем
            } else {
                console.log("something wrong!");
                i--;
            }
        }
    },
    detectDayBuget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert("Ваш бюджет на 1 день = " + appData.moneyPerDay + "$");
    },
    detectLevelExpenses: function () {
        if (appData.moneyPerDay < 100) {
            console.log("Очень мало");
        } else if (appData.moneyPerDay <= 1000) {
            console.log("Обычный доход");
        } else if (appData.moneyPerDay > 1000) {
            console.log("Более чем хорошо");
        } else {
            console.log("Что-то не так");
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let saving = +prompt("Сума накоплений?", ""),
                savingProcent = +prompt("Под какой процент?", "");
            if (isNaN(saving) || saving.length > 10 || typeof (saving) == null || saving == "") {
                saving = +prompt("Сума накоплений?", "");
            }
            if (isNaN(savingProcent) || savingProcent.length > 10 || typeof (savingProcent) == null || savingProcent == "") {
                savingProcent = +prompt("Под какой процент?", "");
            }
            appData.monthIncom = (saving / 100 / 12 * savingProcent).toFixed(2);
        }
        alert("Доход с Вашего депозита в месяц: " + appData.monthIncom + "долл");
    },
    chooseOptExpenses: function () {
        for (let i = 0; i < 3; i++) {
            let OptExpensesQuestion = prompt("статья необязательных расходов", "");
            appData.optionalExpenses[i] = OptExpensesQuestion;
        }
        console.log(appData.optionalExpenses);
    },
    chooseIncome: function () {
        let a = prompt("Что принесет дополнительный доход? (перечислите через запятую)", "");
        if (isNaN(a) && a != null && a != "") {
            console.log("okey");
        } else {
            alert("введите правильные данные!");
            let a = prompt("Что принесет дополнительный доход? (перечислите через запятую)", "");

            appData.income = a.split(',');
            appData.income.push(prompt("может что то еще?", ''));
            appData.income.sort();
        }
        appData.income.forEach(function (itemmassive, i) {
            alert("Способы доп. заработка: " + (i + 1) + " - " + itemmassive);
        });
    }
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]);
}