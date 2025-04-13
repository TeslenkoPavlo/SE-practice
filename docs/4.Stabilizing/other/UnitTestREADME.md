
# Документація по Unit-тестуванню

---

## Налаштування тестового середовища

- Фреймворк тестування
  - Jest
- Середовище розробки
  - WebStorm
- Тестові файли
  - UnitTest1.js
  - UnitTest2.js
  - UnitTest3.js
  - UnitTest4.js
  - UnitTest5.js
  - UnitTest6.js

---

## Реалізовані тести
У середовищі WebStorm були виконані наступні тести:

1. Перевірка приховування модального вікна при натисканні кнопки "Start Navigation"
2. Оновлення стрілки при події deviceorientation
3. Оновлення значення дистанції при успішній геолокації
4. Відображення destinationModal та робота кнопки закриття
5. Відображення підказки (hintBox) при наближенні до точки підказки
6. Обробка помилки геолокації з кодом 1 (Тобто якщо користувач відмовився від надання геолокації)

---

## Результати тестування
Всі тести успішно пройдені в середовищі WebStorm.

---

## UnitTest1.js
```javascript
/**
 * @jest-environment jsdom
 */

// Створюємо мінімальну HTML-структуру, необхідну для роботи скрипту
document.body.innerHTML = `
  <div id="welcomeModal" style="display: block">
    <p>Ласкаво просимо!</p>
    <button id="startNavigation">Start Navigation</button>
  </div>
`;

// Імпортуємо/виконуємо скрипт, щоб додати обробники подій
require('./script.js');

describe('Натискання на кнопку "startNavigation" приховує welcomeModal', () => {
  // Перед кожним тестом скидаємо стан модального вікна
  beforeEach(() => {
    const modal = document.getElementById('welcomeModal');
    if (modal) {
      modal.style.display = 'block';
    }
  });

  test('Приховування welcomeModal', () => {
    // Генеруємо подію DOMContentLoaded, щоб скрипт підписався на події
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const startButton = document.getElementById('startNavigation');
    const modal = document.getElementById('welcomeModal');

    // Симулюємо клік по кнопці
    startButton.click();

    // Очікуємо, що модальне вікно буде сховано
    expect(modal.style.display).toBe('none');
  });
});
```

---

## Скріншот виконання
![](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/4.Stabilizing/other/UnitTest1.png)

---

## UnitTest2.js
```javascript
/**
 * @jest-environment jsdom
 */

describe('Оновлюються стрілки при події deviceorientation', () => {
  beforeEach(() => {
    // Визначаємо DeviceOrientationEvent, щоб увійти до гілки підтримуваних подій
    window.DeviceOrientationEvent = true;

    // Налаштовуємо базову DOM-структуру
    document.body.innerHTML = `
      <div id="distanceValue"></div>
      <div id="hintBox" style="display: none;"></div>
      <div id="gpsArrow" style="transform: rotate(0deg);"></div>
      <div class="main-arrow down" style="transform: rotate(0deg);"></div>
      <div id="welcomeModal" style="display: block;">
        <p>Вітаємо!</p>
      </div>
      <button id="startNavigation">Start Navigation</button>
      <div id="destinationModal" style="display: none;"></div>
    `;

    // Скидаємо кеш модулів, щоб кожен тест запускався з чистим імпортом
    jest.resetModules();

    // Імпортуємо production‑код.
    require('./script');

    // Імітуємо подію DOMContentLoaded для ініціалізації обробників подій
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  it('Оновлення стрілок', () => {
    const topArrow = document.getElementById('gpsArrow');
    const bottomArrow = document.querySelector('.main-arrow.down');

    // Переконуємося в початкових значеннях трансформацій
    expect(topArrow.style.transform).toBe('rotate(0deg)');
    expect(bottomArrow.style.transform).toBe('rotate(0deg)');

    // Створюємо подію deviceorientation з властивістю alpha = 90
    const event = new Event('deviceorientation');
    Object.defineProperty(event, 'alpha', { value: 90 });
    window.dispatchEvent(event);

    // Згідно з логікою у script.js:
    // gpsBearing = 0 (за замовчуванням), phoneHeading встановлюється рівним 90,
    // тому topRotation = 0 - 90 - 45 = -135 градусів,
    // а bottomRotation = -135 + 180 = 45 градусів.
    expect(topArrow.style.transform).toBe('rotate(-135deg)');
    expect(bottomArrow.style.transform).toBe('rotate(45deg)');
  });
});
```

---

## Скріншот виконання
![](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/4.Stabilizing/other/UnitTest2.png)

---

## UnitTest3.js
```javascript
/**
 * distance.test.js
 */

describe("Оновлення значення дистанції при успішній геолокації", () => {
    beforeEach(() => {
        // Приглушення помилкового повідомлення для DeviceOrientationEvent
        jest.spyOn(console, "error").mockImplementation((msg) => {
            if (msg === "DeviceOrientationEvent не підтримується") return;
            console.error(msg);
        });

        // Створення необхідних DOM-елементів
        document.body.innerHTML = `
      <div id="welcomeModal" style="display: block;">
        <p>Ласкаво просимо</p>
        <button id="startNavigation">Старт</button>
      </div>
      <div id="distanceValue"></div>
      <div id="hintBox" style="display: none;"></div>
      <div id="destinationModal" style="display: none;">
        <button id="closeDestination">Закрити</button>
      </div>
      <div id="gpsArrow"></div>
      <div class="main-arrow down"></div>
    `;

        window.gpsBearing = 0;
        window.phoneHeading = 0;

        // Мокаємо геолокацію: передаємо координати, що відрізняються від цільових
        navigator.geolocation = {
            watchPosition: jest.fn((successCallback) => {
                successCallback({
                    coords: {
                        latitude: 49.577878,
                        longitude: 34.532639
                    }
                });
            })
        };

        // Ініціалізація скрипту із ізоляцією модуля
        jest.isolateModules(() => {
            require("./script");
        });

        // Примусова генерація події DOMContentLoaded
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
        // Відновлення стандартної реалізації console.error
        jest.restoreAllMocks();
    });

    test("Оновлюється значення дистанції", () => {
        // Натискаємо на кнопку старту
        document.getElementById("startNavigation").click();

        // Згідно з Гаверсиновою формулою та заданими координатами:
        // target: (49.587878, 34.542639), user: (49.577878, 34.532639)
        // Розрахована дистанція виходить ≈1325 м, після віднімання 10 м => очікуване значення "1315"
        const displayedDistance = document.getElementById("distanceValue").textContent;
        expect(displayedDistance).toBe("1315");
    });
});
```

---

## Скріншот виконання
![](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/4.Stabilizing/other/UnitTest3.png)

---

## UnitTest4.js
```javascript
/**
 * destination.test.js
 */

describe("Відображення destinationModal та робота кнопки закриття", () => {
    beforeAll(() => {
        window.DeviceOrientationEvent = function () {};
    });

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="welcomeModal" style="display: block;">
        <p>Ласкаво просимо</p>
        <button id="startNavigation">Старт</button>
      </div>
      <div id="distanceValue"></div>
      <div id="hintBox" style="display: none;"></div>
      <div id="destinationModal" style="display: none;">
        <button id="closeDestination">Закрити</button>
      </div>
      <div id="gpsArrow"></div>
      <div class="main-arrow down"></div>
    `;

        window.gpsBearing = 0;
        window.phoneHeading = 0;

        // Мокаємо геолокацію: координати рівні пункту призначення
        navigator.geolocation = {
            watchPosition: jest.fn((successCallback) => {
                successCallback({
                    coords: {
                        latitude: 49.587878,
                        longitude: 34.542639
                    }
                });
            })
        };

        jest.isolateModules(() => {
            require("./script");
        });

        document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    test("destinationModal відображається і кнопка закриття працює коректно", () => {
        // Натискаємо кнопку старту
        document.getElementById("startNavigation").click();

        const destinationModal = document.getElementById("destinationModal");
        // Оскільки позиція дорівнює пункту призначення (відстань 0 <= 1),
        // destinationModal має відображатись (display: "flex")
        expect(destinationModal.style.display).toBe("flex");

        // Мокаємо window.location.href для перевірки редіректу
        delete window.location;
        window.location = { href: "" };

        // Натискаємо кнопку закриття
        document.getElementById("closeDestination").click();
        expect(destinationModal.style.display).toBe("none");
        expect(window.location.href).toBe("site.html");
    });
});
```

---

## Скріншот виконання
![](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/4.Stabilizing/other/UnitTest4.png)

---

## UnitTest5.js
```javascript
/**
 * hint.test.js
 */

describe("Відображення підказки (hintBox) при наближенні до точки підказки", () => {
    beforeAll(() => {
        window.DeviceOrientationEvent = function () {};
    });

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="welcomeModal" style="display: block;">
        <p>Ласкаво просимо</p>
        <button id="startNavigation">Старт</button>
      </div>
      <div id="distanceValue"></div>
      <div id="hintBox" style="display: none;"></div>
      <div id="destinationModal" style="display: none;">
        <button id="closeDestination">Закрити</button>
      </div>
      <div id="gpsArrow"></div>
      <div class="main-arrow down"></div>
    `;

        window.gpsBearing = 0;
        window.phoneHeading = 0;

        // Мокаємо геолокацію: координати наближені до першої підказки
        // Підказка: { lat: 49.587891, lon: 34.543045, text: 'Йдіть праворуч до маленьких сходів' }
        navigator.geolocation = {
            watchPosition: jest.fn((successCallback) => {
                successCallback({
                    coords: {
                        latitude: 49.587891,
                        longitude: 34.543045
                    }
                });
            })
        };

        jest.isolateModules(() => {
            require("./script");
        });

        document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    test("hintBox відображається з правильною підказкою", () => {
        document.getElementById("startNavigation").click();

        const hintBox = document.getElementById("hintBox");
        expect(hintBox.style.display).toBe("block");
        expect(hintBox.textContent).toBe("Йдіть праворуч до маленьких сходів");
    });
});
```

---

## Скріншот виконання
![](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/4.Stabilizing/other/UnitTest5.png)

---

## UnitTest6.js
```javascript
/**
 * geolocationError.test.js
 */

describe("Обробка помилки геолокації з кодом 1", () => {
    beforeAll(() => {
        window.DeviceOrientationEvent = function () {};
    });

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="welcomeModal" style="display: block;">
        <p>Ласкаво просимо</p>
        <button id="startNavigation">Старт</button>
      </div>
      <div id="distanceValue"></div>
      <div id="hintBox" style="display: none;"></div>
      <div id="destinationModal" style="display: none;">
        <button id="closeDestination">Закрити</button>
      </div>
      <div id="gpsArrow"></div>
      <div class="main-arrow down"></div>
    `;

        window.gpsBearing = 0;
        window.phoneHeading = 0;

        // Мокаємо геолокацію для симуляції помилки з кодом 1 (відмова доступу)
        navigator.geolocation = {
            watchPosition: jest.fn((successCallback, errorCallback) => {
                errorCallback({ code: 1 });
            })
        };

        jest.isolateModules(() => {
            require("./script");
        });

        document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    test("При помилці з кодом 1 встановлюється відповідне повідомлення і відображається welcomeModal", () => {
        document.getElementById("startNavigation").click();

        const welcomeModal = document.getElementById("welcomeModal");
        const errorMsg = welcomeModal.querySelector("p").textContent;
        expect(errorMsg).toBe("Будь ласка, надайте доступ до геолокації у налаштуваннях браузера та оновіть сторінку");
        expect(document.getElementById("distanceValue").textContent).toBe("Помилка");
    });
});
```

---

## Скріншот виконання
![](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/4.Stabilizing/other/UnitTest6.png)
