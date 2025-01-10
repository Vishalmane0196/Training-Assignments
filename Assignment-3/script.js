
const form = document.querySelector('.form1');
let todos = JSON.parse(localStorage.getItem('todos')) || [];


function notask() {
    const ul = document.getElementsByClassName('ul-list');
    
    let truetodo = todos.filter((todo) => todo.done === false);
    
    if(truetodo.length === 0){
        ul[0].innerHTML = `<li style="color:white; whidth:100%; height:96% ; display:flex; align-items:center;justify-content:center ; font-size:2rem ; color:gray ";> No todos</li>`;
        return;
    }
    if (todos.length === 0) {
        ul[0].innerHTML = `<li style="color:white; whidth:100%; height:96% ; display:flex; align-items:center;justify-content:center ; font-size:2rem ; color:gray ";> No todos</li>`;
        return;
    }
    else {
        DisplayTodos();
    }
};


const todaydate = new Date().toISOString().split('T')[0];
document.getElementById('due-date').setAttribute('min', todaydate);

let titlee = document.getElementById('title');
titlee.addEventListener('input', function (e) {
    if (this.value.length > 17) {
        this.value = this.value.slice(0, 17); 
    }
});


let descriptione = document.getElementById('description');
descriptione.addEventListener('input', function (e) {
    if (this.value.length > 50) {
        this.value = this.value.slice(0, 50);
    }
});




form.addEventListener('submit', function (e) {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const due_date = document.getElementById('due-date').value;
    if ([titlee.value, due_date, category].includes('')) { alert(" * fields required"); return; }
    else {
        const todo = {
            title: titlee.value,
            category: category,
            Description: descriptione.value,
            due_date: due_date,
            done: false,
            createdAt: new Date().getTime()
        };
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        const completed = document.getElementsByClassName('com-btn');
        const todobtn = document.getElementsByClassName('todo-btn');
        completed[0].classList.remove('active');
        todobtn[0].classList.add('active');
        DisplayTodos();
        this.reset();
    }

});

function DisplayTodos() {
    const ul = document.getElementsByClassName('ul-list')[0];
    let truetodo = todos.filter((todo) => todo.done === false);
    
    if(truetodo.length === 0){
        ul.innerHTML = `<li style="color:white; whidth:100%; height:96% ; display:flex; align-items:center;justify-content:center ; font-size:2rem ; color:gray ";> No todos</li>`;
        return;
    }
    if(todos.length === 0){
        notask();
    }
   
    ul.innerHTML = '';
    todos.forEach((todo) => {
        if (todo.done) return; 

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="li-right">
                <h2>${todo.title}</h2>
                <p>${todo.Description}</p>
                <br>
                <p>Due: ${todo.due_date}</p>
                <p>${todo.category}</p>
            </div>
            <div class="li-left">
                <button class="edit" data-id="${todo.createdAt}"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="check" data-id="${todo.createdAt}"><i class="fa-solid fa-check"></i></button>
                <button class="delete" data-id="${todo.createdAt}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        ul.appendChild(li);
    });
    addEventListenertoAllButton();
}


function tolodisplay() {
    const ul = document.getElementsByClassName('ul-list');
   
    if (todos.length === 0) {
        ul[0].innerHTML = `<li style="color:gray; whidth:100%; height:96% ; display:flex; align-items:center;justify-content:center ; font-size:2rem"> No todos</li>`;
        return;
    }
    else {
        let newtodo = todos.filter((todo) => todo.done === true);
        if (todobtn[0].classList.contains('active')) {
            DisplayTodos();
        }
        else {
            DisplayTodoscompleted(newtodo);
        }
    }
}

function addEventListenertoAllButton() {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            todos = todos.filter((todo) => todo.createdAt !== parseInt(id, 10));
            localStorage.setItem('todos', JSON.stringify(todos));
            let li = this.parentElement.parentElement;
            li.classList.add('slide-min');
            // tolodisplay();
            li.addEventListener('animationend', () => {
                li.remove();
                tolodisplay();
            });

        });
    });

    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const todo = todos.find((todo) => todo.createdAt === parseInt(id, 10));
            document.getElementById('title').value = todo.title;
            descriptione.value = todo.Description;
            document.getElementById('due-date').value = todo.due_date;
            document.getElementById('category').value = todo.category;

            todos = todos.filter((todo) => todo.createdAt !== parseInt(id, 10));
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        });
    });

    const checkButtons = document.querySelectorAll('.check');
    checkButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const todo = todos.find((todo) => todo.createdAt === parseInt(id, 10));
            todo.done = !todo.done;

            localStorage.setItem('todos', JSON.stringify(todos));
            const completedTodos = todos.filter((todo) => todo.done);
            if (document.querySelector('.com-btn').classList.contains('active')) {
                DisplayTodoscompleted(completedTodos);
            } else {
                DisplayTodos();
                
            }
        });
    });
}


const completed = document.getElementsByClassName('com-btn');
completed[0].addEventListener('click', function () {
    const todobtn = document.getElementsByClassName('todo-btn');
    let newtodo = todos.filter((todo) => todo.done === true);
    completed[0].classList.add('active');
    todobtn[0].classList.remove('active');
    DisplayTodoscompleted(newtodo);
})



function DisplayTodoscompleted(completedTodos){
    if(completedTodos.length === 0){
        const ul = document.getElementsByClassName('ul-list')[0];
        ul.innerHTML = `<li style="color:gray; whidth:100%; height:96% ; display:flex; align-items:center;justify-content:center ; font-size:2rem;"> All task completed</li>`;
    }
    else{
        const ul = document.getElementsByClassName('ul-list')[0];
    ul.innerHTML = '';

    completedTodos.forEach((todo) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="li-right">
                <h2>${todo.title}</h2>
                <p>${todo.Description}</p>
                <br>
                <p>Due: ${todo.due_date}</p>
                <p>${todo.category}</p>
            </div>
            <div class="li-left">
                <button class="check" data-id="${todo.createdAt}"><i class="fa-solid fa-xmark"></i></button>
                <button class="delete" data-id="${todo.createdAt}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
       
        ul.appendChild(li);
    });
    addEventListenertoAllButton();
    }
}


const todobtn = document.getElementsByClassName('todo-btn');
todobtn[0].addEventListener('click', function () {
    todobtn[0].classList.add('active');
    completed[0].classList.remove('active');
    notask();
})


const clear_btn = document.getElementsByClassName('clear-btn');
clear_btn[0].addEventListener('click', function () {
    
    if (todos.length === 0) {
        alert('No tasks to clear..');
        return;
    }
    else {
        confirm('Are you sure you want to delete all todos?');
        localStorage.removeItem('todos');
        window.location.reload();
    }

})
// Calendar JS


const month = document.querySelector('.month')
const day = document.querySelector('.day')
const date = document.querySelector('.date')
const year = document.querySelector('.year')

const today = new Date();
month.innerHTML = today.toLocaleString('default', { month: 'long' })
day.innerHTML = today.toLocaleString('default', { weekday: 'long' });
date.innerHTML = today.getDate();
year.innerHTML = today.getFullYear();


notask();