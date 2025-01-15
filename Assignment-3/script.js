document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form1');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    var audio = new Audio('y2mate (mp3cut.net).mp3');
    var deleteaudio = new Audio('deleteaudio.mp3');

    document.getElementsByClassName('sub-btn')[0].style.opacity = '0.4';  // opacity of submit button

    document.getElementById('title').addEventListener('input', function (e) {
        if (e.data == null || document.getElementById('title').value == '') {
            document.getElementsByClassName('sub-btn')[0].style.opacity = '0.4';
        }
        else {
            document.getElementsByClassName('sub-btn')[0].style.opacity = '1';
        }
    })


    document.getElementsByClassName('addtoli')[0].addEventListener('click', function () {
        document.getElementsByClassName('inner')[0].style.display = 'block';
        document.getElementsByClassName('main1')[0].style.display = 'none';
        document.getElementsByClassName('list')[0].style.display = 'none';
        document.getElementsByClassName('form1')[0].style.display = 'block';
        document.getElementsByClassName('addtoli')[0].classList.add('liactive');
        document.getElementsByClassName('view-todo')[0].classList.remove('liactive');

    })

    function notask() {
        const ul = document.getElementsByClassName('ul-list');
        let truetodo = todos.filter((todo) => todo.done === false);

        if (truetodo.length === 0) {
            ul[0].innerHTML = `<li style="color:white; width:100%; height:96%; display:flex; align-items:center;justify-content:center; font-size:2rem; color:gray;"> No todos</li>`;
            document.querySelector('.clear-btn').style.opacity = '0.2';
            return;
        }
        if (todos.length === 0) {
            ul[0].innerHTML = `<li style="color:white; width:100%; height:96%; display:flex; align-items:center;justify-content:center; font-size:2rem; color:gray;"> No todos</li>`;
            document.querySelector('.clear-btn').style.opacity = '0.2';

            return;
        } else {
            DisplayTodos(todos);
        }
    }

    const todaydate = new Date().toISOString().split('T')[0];
    document.getElementById('due-date').setAttribute('min', todaydate);



    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const titlee = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const due_date = document.getElementById('due-date').value;
        const descriptione = document.getElementById('description').value;
        if ([titlee, due_date, category].includes('')) { alert(" * fields required"); return; }
        else {
            const todo = {
                title: titlee,
                category: category,
                Description: descriptione,
                due_date: due_date,
                done: false,
                createdAt: new Date().getTime()
            };
            todos.unshift(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            const completed = document.getElementsByClassName('com-btn');
            const todobtn = document.getElementsByClassName('todo-btn');
            completed[0].classList.remove('active');
            todobtn[0].classList.add('active');
            DisplayTodos(todos);
            document.querySelector('.clear-btn').style.opacity = '1';
            document.getElementsByClassName('sub-btn')[0].style.opacity = '0.4';
            this.reset();
        }
    });

    function DisplayTodos(todos) {
        const ul = document.getElementsByClassName('ul-list')[0];
        let truetodo = todos.filter((todo) => todo.done === false);

        if (truetodo.length === 0) {
            ul.innerHTML = `<li style="color:white; width:100%; height:96%; display:flex; align-items:center;justify-content:center; font-size:2rem; color:gray;"> No todos</li>`;
            document.querySelector('.clear-btn').style.opacity = '0.2';
            return;
        }
        if (todos.length === 0) {
            notask();
        }

        ul.innerHTML = '';
        todos.forEach((todo) => {
            if (todo.done) return;

            const li = document.createElement('li');
            li.innerHTML = `
                <div class="li-right">
                    <h2>${todo.title}</h2>
                    <p class="editable">${todo.Description}</p>
                    <br>
                    <p>Due: ${todo.due_date}</p>
                    <p>${todo.category}</p>
                </div>
                <div class="li-left">
                    <button class="check" data-id="${todo.createdAt}"><i class="fa-solid fa-check"></i></button>
                    <button class="delete" data-id="${todo.createdAt}"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            li.setAttribute('data-id', todo.createdAt);
            li.style.cursor = 'pointer';
            li.classList.add('popupliid');
            ul.appendChild(li);
        });
        addEventListenertoAllButton();
        counttotal();


    }

    function tododisplay() {
        const ul = document.getElementsByClassName('ul-list');

        if (todos.length === 0) {
            ul[0].innerHTML = `<li style="color:gray; width:100%; height:96%; display:flex; align-items:center;justify-content:center; font-size:2rem"> No todos</li>`;
            counttotal();
            return;
        } else {
            let newtodo = todos.filter((todo) => todo.done === true);
            if (todobtn[0].classList.contains('active')) {
                counttotal();
                DisplayTodos(todos);

            } else {
                counttotal();
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
                dleteaudio();
                li.addEventListener('animationend', () => {
                    li.remove();
                    tododisplay();
                });
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
                    playaudio();
                    DisplayTodos(todos);
                }
            });
        });

        const editableDescriptions = document.querySelectorAll('.editable');
        editableDescriptions.forEach((desc) => {
            desc.addEventListener('click', function () {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = desc.textContent;
                input.classList.add('edit-input');
                desc.replaceWith(input);
                input.focus();

                let enterPressed = false;

                input.addEventListener('blur', function () {
                    if (!enterPressed) {
                        saveEdit(input);
                    }
                });

                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        enterPressed = true;
                        saveEdit(input);
                    }
                });
            });
        });


        document.querySelectorAll('.popupliid').forEach(li => {
            li.addEventListener('click', function (e) {
                // if (!e.target.classList.contains('todo-item')) {
                //     return;
                // }
                
                if(e.target.classList[0] == 'popupliid')
                {
                    document.getElementsByClassName('popup')[0].style.display = 'block';
                let name = document.querySelector('.pop-task-name')
                let desc = document.querySelector('.pop-task-description')
                let due = document.querySelector('.pop-due-date')
                let category = document.querySelector('.pop-category')

                name.innerText = this.childNodes[1].childNodes[1].innerText;
                desc.innerText = this.childNodes[1].childNodes[3].innerText;
                category.innerText = this.childNodes[1].childNodes[9].innerText;
                due.innerText = this.childNodes[1].childNodes[7].innerText;
                console.log(this.childNodes[1].childNodes[9]);
                document.getElementById('overlay').style.display = 'block';
                }


            })
        })
    }

    function saveEdit(input) {
        const p = document.createElement('p');
        p.textContent = input.value;
        p.classList.add('editable');
        input.replaceWith(p);

        const li = p.closest('li');
        console.log(li);
        const id = li.getAttribute('data-id');
        const todo = todos.find(todo => todo.createdAt === parseInt(id, 10));
        todo.Description = input.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        addEventListenertoAllButton();
    }
    let newtodo = todos.filter((todo) => todo.done == true);

    const completed = document.getElementsByClassName('com-btn');
    completed[0].addEventListener('click', function () {
        newtodo = todos.filter((todo) => todo.done == true);
        const todobtn = document.getElementsByClassName('todo-btn');
        completed[0].classList.add('active');
        todobtn[0].classList.remove('active');
        DisplayTodoscompleted(newtodo);
    });

    function DisplayTodoscompleted(completedTodos) {
        if (completedTodos.length === 0) {
            const ul = document.getElementsByClassName('ul-list')[0];
            ul.innerHTML = `<li style="color:gray; width:100%; height:96%; display:flex; align-items:center;justify-content:center; font-size:2rem;"> All task completed</li>`;
        } else {
            const ul = document.getElementsByClassName('ul-list')[0];
            ul.innerHTML = '';

            completedTodos.forEach((todo) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="li-right" >
                        <h2>${todo.title}</h2>
                        <p>${todo.Description}</p>
                        <br>
                        <p>Due: ${todo.due_date}</p>
                        <p>${todo.category}</p>
                    </div>
                    <div class="li-left">
                        
                        <button class="delete" data-id="${todo.createdAt}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                ul.appendChild(li);
            });
            addEventListenertoAllButton();
            counttotal();
        }
    }

    const todobtn = document.getElementsByClassName('todo-btn');
    todobtn[0].addEventListener('click', function () {
        todobtn[0].classList.add('active');
        completed[0].classList.remove('active');
        notask();
    });

    const clear_btn = document.getElementsByClassName('clear-btn');
    clear_btn[0].addEventListener('click', function () {
        if (todos.length === 0) {
            alert('No tasks to clear..');
            return;
        } else {
            if (confirm('Are you sure you want to delete all todos?')) {
                counttotal();
                localStorage.removeItem('todos');
                window.location.reload();
            }
        }
    });
    function playaudio() {
        audio.play();
    }

    function dleteaudio() {
        deleteaudio.play();
    }


    document.getElementsByClassName('view-todo')[0].addEventListener('click', function () {
        document.querySelector('.form1').style.display = 'none';
        document.getElementsByClassName('main1')[0].style.display = 'none';
        document.getElementsByClassName('inner')[0].style.display = 'block';
        document.getElementsByClassName('list')[0].style.display = 'block';
        document.getElementsByClassName('addtoli')[0].classList.remove('liactive');
        document.getElementsByClassName('view-todo')[0].classList.add('liactive');

    })


    //Search Bar
    document.getElementsByClassName('search')[0].addEventListener('input', function (e) {

        let searchValue = document.getElementsByClassName('search')[0].value;
        const todobtn = document.getElementsByClassName('todo-btn');
        // let newcomarray = todos.filter(todo=>todo.done == true);
        let newarray = [];
        if (searchValue.includes(" ") || e.data == null) {
            if (todobtn[0].classList.contains('active')) {
                console.log('i am here')
                DisplayTodos(todos);
                return;
            }
            else {

                DisplayTodoscompleted(newtodo);
                return;

            }
        } else {
            todos.forEach(todo => {

                if (todo.done == true) {

                    if (todo.title.includes(searchValue.trim()) || todo.Description.includes(searchValue.trim())) {
                        newarray.push(todo);
                        return;
                    }
                } else if (todobtn[0].classList.contains('active')) {

                    if (todo.title.includes(searchValue.trim()) || todo.Description.includes(searchValue.trim())) {
                        newarray.push(todo);
                    }
                }

            });
        }

        if (todobtn[0].classList.contains('active')) {
            DisplayTodos(newarray)
        }
        else {
            DisplayTodoscompleted(newarray)
        }
    });


    //-------------Sorting


    document.getElementById('sort').addEventListener('click', function () {
        let sortedArray = [];
        let sortType = document.getElementById('sort').value;
        if (sortType == 'AZ') {
            sortedArray = todos.slice().sort((a, b) => a.title.localeCompare(b.title))
            if (todobtn[0].classList.contains('active')) {
                DisplayTodos(sortedArray);
                return;
            }
            else {
                DisplayTodoscompleted(sortedArray);
                return;
            }

        }
        else if (sortType == 'ZA') {
            sortedArray = todos.slice().sort((a, b) => b.title.localeCompare(a.title))
            if (todobtn[0].classList.contains('active')) {
                DisplayTodos(sortedArray);
                return;
            }
            else {
                DisplayTodoscompleted(sortedArray);
                return;
            }
        }
        else if (sortType == 'latest') {
            sortedArray = todos.slice().sort((a, b) => new Date(b.due_date) - new Date(a.due_date));

            if (todobtn[0].classList.contains('active')) {
                DisplayTodos(sortedArray);
                return;
            }
            else {
                DisplayTodoscompleted(sortedArray);
                return;
            }
        }
        else if (sortType == 'date') {
            sortedArray = todos.slice().sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

            if (todobtn[0].classList.contains('active')) {
                DisplayTodos(sortedArray);
                return;
            }
            else {
                DisplayTodoscompleted(sortedArray);
                return;
            }
        }

    })

    document.getElementsByClassName('cancel-button')[0].addEventListener('click', function () {

        let name = document.querySelector('.pop-task-name')
        let desc = document.querySelector('.pop-task-description')
        let due = document.querySelector('.pop-due-date')
        let category = document.querySelector('.pop-category')

        name.innerText = " ";
        desc.innerText = " ";
        due.innerText = " ";
        category.innerText = " ";

        document.getElementsByClassName('popup')[0].style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    })



    notask();



    //-------------Notification 

    function checkDueDates() {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        todos.forEach(todo => {

            if (todo.done === false) {
                let dat = '';
                dat = today.getDate();
                duetae = todo.due_date.split('-')[2];
                duetae = parseInt(duetae);
                if (duetae == dat) {

                    sendNotification(todo.title, todo.due_date);
                }
            }
        });
    }

    function sendNotification(title, dueDate) {
        if (Notification.permission === 'granted') {
            new Notification('Todo Reminder', {
                body: `Your task "${title}" is due on Today.`,
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Todo Reminder', {
                        body: `Your task "${title}" is due on ${dueDate}.`,
                    });
                }
            });
        }
    }

    function counttotal() {
        let count = 0;
        todos.forEach((todo) => {
            if (todo.done === false) {
                count++;
            }
        });
        document.getElementsByClassName('todototal')[0].innerHTML = count;

    }

    counttotal();
    checkDueDates();


    // setTimeout(checkDueDates, 2000);

});