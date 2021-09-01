"use strict";

const doUniversity = (docs) => {
  //создадим переменную promise и присвоим ей функию конструктор
  // эта функция принимает в качестве параметра тоже функцию (функция exexuter- выполнитель обещания)
  // эта функция, которая будет предпринимать действия, чтобы вернуть результат,
  //т.е что-то в ней будет происходить и после этого будет возвращаться результат выпоелнения обещания
  //фунекция принимает 2 параметра, 2 функции(resolve, reject)- это функции сигнализаторы выполения обещания
  return new Promise((resolve, reject) => {
    console.log("Рассмотрение документов...");
    if (docs) {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          let result = "Принят";
          // после того, как отработал resolve, мы попадаем в функцию .then()
          resolve(result); // выполняется .then(1-я функция)
        } else {
          reject("Оказано"); // выполняется .then(2-я функция)
        }
      }, 3000);
    } else {
      reject("Оказано, не хватает документов");
    }
  });
};

const doArmy = (docs) => {
  return new Promise((resolve, reject) => {
    if (docs) {
      console.log("Военком думает...");
      setTimeout(() => {
        if (docs === "Принят") {
          resolve("Отсрочка");
          console.log("Отсрочка");
        } else {
          reject("Повестка");
        }
      }, 2000);
    } else {
      reject("Повестка");
    }
  });
};

const doWork = (docs) => {
  return new Promise((resolve, reject) => {
    console.log("Директор google думает...");
    setTimeout(() => {
      if (Math.random() > 0.3) {
        let result = "Пришлашён на собеседование в Google в понедельник";
        console.log(result);
        resolve(result);
      } else {
        reject("Оказано, иди в Яндекс");
      }
    }, 3000);
  });
};

const documents = ["паспорт", "аттестат"];

// //метод .then() обрабатывает последствие нашего обещания т.е что будет происходить, если обещание выполнится или не выполнится
// // последствие -это действие, а значит функция, поэтому метод .then() принимает в качетсве параметра 2 функции:
// // 1-я функция выполняется, если обещаение выполено успешно, т.е отработает resolve (resolve(result);)
// // 2-я функция выполнится, если у нас promise не выполнится, т.е отработает reject (reject("Оказано");)
// doUniversity(documents)
//   // этот метод отрабатывает, после того, как отработал resolve(положительный ответ)
//   // внутри есть функция, которая принимает результат, который мы передали в resolve (resolve(result))
//   // и наща функция в методе then принимает этот результат, выводит его в консоль и возвращает: то, что приняли, то и отдали дальше
//   .then((result) => {
//     console.log(result);
//     // мы должны в этой функции вернуть наш результат
//     // таким образом он передаётся в doArmy
//     return result;
//   })
//   // этот метод .then() выполнится, в случае, если предыдущий then() был успешный
//   // cоздаётся новое обещание (then всегда создаёт новое обещание) и передаёт это обещание в doWork
//   .then(doArmy)
//   .then(doWork)
//   // метод .catch(), который будет отрабатывать все возражения. Если любая из функций вернёт нам отрицательный promise
//   // то отработает метод .catch()
//   // catch запускается, если любой из промисов, будь то doUniversity, doArmy или doWork вернёт нам reject
//   // или будет какая- нибудь ошибка в функции. т.е catch ловит любую ошибку или reject
//   .catch((reason) => console.error(reason))
//   // так часто записывают команды по очистке инпутов
//   .finally(() => console.warn("Выполнится в любом случае"));

// случай, когда нужно дождаться выполнения всех промисов
const doWorking = (company) => {
  return new Promise((resolve, reject) => {
    const time = Math.ceil(Math.random() * 3000);
    setTimeout(() => {
      if (time % 15) {
        resolve(company);
      } else {
        reject(company);
      }
    }, time);
  });
};

const hh = doWorking("HH"),
  yandex = doWorking("yandex"),
  ozone = doWorking("ozone"),
  pikabu = doWorking("pikabu"),
  politics = doWorking("Гос Дума");

// ожидает выполнения первого промиса
// т.е какой первый выполнится, тот и попадёт в then
Promise.race([hh, yandex, ozone, pikabu, politics])
  .then((result) => console.log(`Тебя пригласили на собеседование в ${result}`))
  .catch((result) => console.error(`Компания ${result} отказала`));

// ожидает выполнения всех промисов
// Promise.all([hh, yandex, ozone, pikabu, politics])
//   .then((result) => console.log(`Тебя пригласила на собеседование в ${result}`))
//   .catch((result) => console.error(`Компания ${result} отказала`));
