# Документи етапу концептуального проектування (аналізу)

Послідовність робіт на цьому етапі:

1. Спільними зусиллями **Розподілити ролі** в команді, заповнити відповідний [документ](/docs/1.Envisioning/team.md) (не заюбудьте вигадати назву для своєї команди!)
2. Всім членам команди **ознайомитись з [інструкцією з охорони праці](/docs/1.Envisioning/other/safety.md) і поставити в кінці документу позначку про виконання** (менеджер програми вписує прізвища членів команди)!
3. Спільними зусиллями (координує менеджер програми) команда створює **чернетку календарного плану**, шляхом додавання *Issues* для роботи з ними в [Projects](https://github.com/users/TeslenkoPavlo/projects/2), або перегляду в [GanntLab](https://app.ganttlab.com/).

<!--:warning: **Увага!** почати треба зі створення *Milestones* для всіх п'яти етапів проекту, після чого додати всі проектні завдання у вигляді *Issues*, з датами початку і кінця в описі:
```
GanttStart: 2020-04-27
GanttDue: 2020-05-08
```
>Ви можете задати `GanttStart` та `GanttDue` *з точністю до секунди*, наприклад, `2020-06-20T14:00:00+02:00` для нашого часового поясу (UTC+2).

>*Ви також маєте створити проект** на основі шаблона *Board* , додати ще одну доріжку й переймунувати їх аби отримати доріжки "*До виконання*", "*В процесі*", "*Перевіряється*", "*Виконано*", і **додати всі Issues до доріжки "В процесі"**-->

>:warning: Рекомендований на 2023 рік спосіб планування проекту - використання функціональності **Roadmap** в *Projects*. Детальніше про проекти читайте [тут](https://docs.github.com/en/issues/planning-and-tracking-with-projects), про роадмапи - [тут](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/customizing-the-roadmap-layout).

4. Члени команди (менеджер продукту, юзер експірієнс, розробник) створюють **список питань для інтерв'ю** та фіксують їх у [відповідному документі](/docs/1.Envisioning/other/Список%20питань%20(інтерв'ю).md)
5. Після проведення інтерв'ю команда створює **[протокол інтерв'ю](/docs/1.Envisioning/other/Протокол%20інтерв'ю.md)**
6. Члени команди (ролі, які не змогли сформувати цілісну картину своєї частки проекту за результатами інтерв'ю) створюють **анкету для замовника** аби уточнити спірні моменти. Для створення анкети слід скористатись сервісом [Google Forms](https://forms.new/) (посилання створить нову форму), після чого надіслати її замовнику у пошті чи месенджері. Результати анкетування слід зберегти в PDF та покласти в теку [other/Відповіді на форму](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/1.Envisioning/other/%D0%92%D1%96%D0%B4%D0%BF%D0%BE%D0%B2%D1%96%D0%B4%D1%96%20%D0%BD%D0%B0%20%D1%84%D0%BE%D1%80%D0%BC%D1%83.pdf)
7. Члени команди (менеджери програми та продукту з допомогою інших) заповнюють документи **[Концепції проекту](/docs/1.Envisioning/%D0%9A%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D1%96%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%83.md)** та **[Cтруктури проекту](/docs/1.Envisioning/%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%83.md)**
8. Члени команди (розробник, менеджер продукту з допомогою інших) будують **[діаграму прецедентів](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/1.Envisioning/CaseDiagram2.drawio.png)** для майбутньої системи (посилання створить нову діаграму в *draw.io* в GitHub-режимі). Готову діаграму слід покласти в цій теці (````1. Envisioning````)
9.  Шляхом *мозкового штурму* члени команди спільними зусиллями заповнюють **[таблицю оцінки та пріоритезації ризиків](https://github.com/TeslenkoPavlo/SE-practice/blob/main/docs/1.Envisioning/other/%D0%90%D0%BD%D0%B0%D0%BB%D1%96%D0%B7%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D0%B8%D1%85%20%D1%80%D0%B8%D0%B7%D0%B8%D0%BA%D1%96%D0%B2%20%D0%A2%D0%B5%D1%81%D0%BB%D0%B5%D0%BD%D0%BA%D0%BE.xlsx)** Документ вже містить формули для розрахунку очікуваного впливу ризику. <br>**УВАГА!** Перш ніж починати працювати з таблицею - занесіть прізвища членів команди на лист "Люди" аби мати можливість обирати їх у графі "Відповідальний"! Після заповнення відсортуйте ризики *за спаданням значення очікуваного впливу* і виділіть кольором п'ять перших ризиків - це будуть *головні ризики проекту*. 
10.  На основі таблиці члени команди (менеджери програми та продукту з допомогою інших) заповнюють документ **[Оцінка ризиків](/docs/1.Envisioning/%D0%9E%D1%86%D1%96%D0%BD%D0%BA%D0%B0%20%D1%80%D0%B8%D0%B7%D0%B8%D0%BA%D1%96%D0%B2.md)**

---

:warning: **УВАГА!**
Слід запам'ятати такі речі:
* в шаблонах документів ви маєте щось писати лише в місцях, відмічених знаком :point_right:. Що саме там писати (а іноді й приклади як саме) - відмічено знаком :bulb:. УВАГА! В фінальному документі цих підказок бути не повинно!
* всі рішення, прийняті командою, слід оформляти у вигляді **[протоколів нарад](/docs/1.Envisioning/other/%D0%91%D0%BB%D0%B0%D0%BD%D0%BA%20%D0%BF%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB%D1%83%20%D0%BD%D0%B0%D1%80%D0%B0%D0%B4%D0%B8.md)**  
* якщо в процесі аналізу з'являються нові обставини та виникають зміни в планах - член команди (відповідна роль) створює [запит на зміни](/docs/1.Envisioning/other/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%82%D1%83%20%D0%BD%D0%B0%20%D0%B7%D0%BC%D1%96%D0%BD%D0%B8.md), і як результат обговорення (не забуваємо про протокол наради!) команда змінює календарний план - **закриває відповідні Issues і створює нові**!
* кроки **4, 5, 6, 7** перекриваються і *виконуються паралельно*, а документ "[Структура проекту](/docs/1.Envisioning/%D0%A1%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%83.md)" *багато чого запозичує* з "[Концепції проекту](/docs/1.Envisioning/%D0%9A%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D1%96%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D1%83.md)"

---
[:arrow_up: Повернутись до теки документації](/docs/README.md)
