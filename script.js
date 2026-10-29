console.log(`работаем!`);

const toDoListWrap = document.querySelector(`.todo-list_wrapper`);
const todoInput = document.querySelector(`.todo-input`);
const todoButton = document.querySelector(`.todo-button`);
const inputForm=document.querySelector(`.input_form`)

//ПЕРЕКЛЮЧЕНИЕ ФОНА
const buttonAutumn = document.querySelector(`.button-autumn`);
const buttonWinter = document.querySelector(`.button-winter`);
const buttonSummer = document.querySelector(`.button-summer`)

const backgroundAutumn = document.querySelector(`.season-autumn`);
const backgroundWinter = document.querySelector(`.season-winter`);
const backGroundSummer = document.querySelector(`.season-summer`)

const h1 = document.getElementById(`h1`);

// СМЕНА ФОНА
function backgroundVisibility(background) {
  const backgroundAll = [backgroundWinter, backgroundAutumn, backGroundSummer];
  backgroundAll.forEach((block) => {
    block.style.visibility = block === background ? `visible` : `hidden`;
  });
}
buttonAutumn.addEventListener(`click`, () => {
  backgroundVisibility(backgroundAutumn);
  h1.style.color = ` rgb(158, 74, 10)`;
  h1.textContent = `Autumn Todo`;
  todoButton.style.backgroundColor = ` rgb(239, 139, 8)`
  todoInput.style.border =`solid 2px rgb(222, 165, 101)`
});

buttonWinter.addEventListener(`click`, () => {
  backgroundVisibility(backgroundWinter);
  h1.style.color = `rgba(21, 94, 34)`;
  h1.textContent = `Winter Todo`;
  todoButton.style.backgroundColor = `rgba(21, 94, 34)`;
  todoInput.style.border =`solid 2px rgba(34, 100, 24, 0.77)`
});

buttonSummer.addEventListener(`click`, () => {
  backgroundVisibility(backGroundSummer);
  h1.style.color = ` rgba(122, 197, 90, 1)`;
  h1.textContent = `Summer Todo`;
  todoButton.style.backgroundColor = `rgba(45, 197, 7, 0.77)`;
  todoInput.style.border =`solid 2px rgba(50, 208, 10, 0.77)`
});

//СОЗДАНИЕ ТОDO, ОСНОВА

const todoList = document.createElement(`ol`);
todoList.textContent = ``;
todoList.style.padding = `0px`;
todoList.style.listStyle = `none`;
toDoListWrap.appendChild(todoList);

//Сохранение 1
let savedToDo = JSON.parse(localStorage.getItem("savedToDo")) || [];

function addNewLi(text, done=false, isNew=true) {
 
  const todoLi = document.createElement(`li`);
  //Div -общий внутри div с текстом инпута, чекбокс и кнопока удалить
  const divInLi = document.createElement(`div`);
  divInLi.style.display = `flex`;
  divInLi.style.flexDirection = `row`;
  divInLi.style.justifyContent = `space-between`;
  divInLi.style.color = ` rgba(86, 43, 11, 1)`;
  divInLi.style.fontFamily = `Caveat`;
  divInLi.style.fontSize = `30px`;
  // DIV для Checkbox и Span
  const divForCheckboxAndSpan = document.createElement(`div`);
  // Чекбокс
  const checkboxInDiv = document.createElement(`input`);
   checkboxInDiv.type = `checkbox`;
 checkboxInDiv.checked = done
  checkboxInDiv.style.cursor = `pointer`;
  divForCheckboxAndSpan.appendChild(checkboxInDiv);
  //SPAN с текстом
  const spanInDiv = document.createElement(`span`);
  spanInDiv.textContent = text;
  divForCheckboxAndSpan.appendChild(spanInDiv);

  //Сохранение2
  if(isNew){
  savedToDo.push({ text: text, done: checkboxInDiv.checked });
  localStorage.setItem("savedToDo", JSON.stringify(savedToDo));
}
todoInput.value=""
  // Кнопка Удалить в divInLi
  const deleteButton = document.createElement(`button`);
  deleteButton.textContent = `х`;
  deleteButton.style.fontSize = `15px`;
  deleteButton.style.color = `red`;
  deleteButton.style.cursor = `pointer`;
  deleteButton.style.border = `none`;
  deleteButton.style.backgroundColor = `transparent`;
  // Выводим Li
  todoLi.appendChild(divInLi);
  todoList.appendChild(todoLi);
  divInLi.appendChild(divForCheckboxAndSpan);
  divInLi.appendChild(deleteButton);
  //Удаляем Список
  deleteButton.addEventListener(`click`, () => {
    todoLi.remove();
// Удаляем из LocalStorage
savedToDo = savedToDo.filter(el=> el.text !==spanInDiv.textContent)
localStorage.setItem("savedToDo", JSON.stringify(savedToDo))

  });
  checkboxInDiv.addEventListener(`change`, () => {
    if (checkboxInDiv.checked) {
      spanInDiv.style.textDecoration = `line-through`;
       
const task = savedToDo.find(el=> el.text===spanInDiv.textContent)
if(task){
task.done =checkboxInDiv.checked
localStorage.setItem("savedToDo", JSON.stringify(savedToDo))
}
    } else {
      spanInDiv.style.textDecoration = `none`;
    }
  });
}

// ВЫВОДИМ СПИСКИ
 inputForm.addEventListener(`submit`, (e) => {
  e.preventDefault()
  if (todoInput.value !== ``) {
    return addNewLi(todoInput.value, false, true);
  } else {
    todoInput.placeholder = `введите дело`;
  }
});
// ВЫВОДИМ СОХРАНЕННЫЕ СПИСКИ ПОСЛЕ ПЕРЕЗАГРУЗКИ
const getTodo = JSON.parse(localStorage.getItem("savedToDo"))||[]
getTodo.forEach(el=> addNewLi(el.text, el.done, false))


