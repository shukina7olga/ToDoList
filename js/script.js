'use strict'; 
const todoControl = document.querySelector('.todo-control'), // форма с инпутом и плюсиком
    headerInput = document.querySelector('.header-input'), // чисто инпут
    todoList = document.querySelector('.todo-list'), // список надо делять
    todoCompleted = document.querySelector('.todo-completed'); // список сделяно

const todoData = JSON.parse(localStorage.getItem('todoData') || '[]'); 
    //при создании todoData либо сразу подгружаем данные из  localStorage (если они там есть) либо создаем пустой массив []
const render = function(){ // перебирает todoData, что б потом обновлять 
    localStorage.setItem('todoData', JSON.stringify(todoData));
    // записываем данные в localStorage при вызове функции render() // пконвертируем в json формат 
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, index){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
        
        const btnTodoComplete = li.querySelector('.todo-complete');
        const btnTodoRemove = li.querySelector('.todo-remove'); // берем элемент не из document, а из li

        btnTodoComplete.addEventListener('click', function(){ // перемещение дел сделано<=>не сделано
            item.completed = !item.completed;
            render();
        });

        btnTodoRemove.addEventListener('click', function(){
            todoData.splice(index, 1);    
            // remove() удалит только DOM-элемент но он будет в todoData !!!!
            // по этому удаляем из массива todoData 1 элемент с индексом index 
            render();
        });

    });
};

todoControl.addEventListener('submit', function(event){ // стандартное поведение браузера - при нажатии "плюс" стр
    event.preventDefault();                   // перезагружается и мы отменяем это поведение
    if(!headerInput.value){  // если ничего не ввели
        return;              // выходим из функции
    }
    // происходит событие submit и мы добавляем новый объект
    const newTodo = { // создаем этот объект
        value: headerInput.value,
        completed: false, 
    };

    todoData.push(newTodo);
    render();
    headerInput.value = ''; // очищаем инпут после ввода
});

render(); // тобы страница рендерилась сразу