
const form  =  document.querySelector('.form1');
let todos = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const title = document.getElementById('title').value;
    const Description = document.getElementById('desciption').value;
    const due_date = document.getElementById('due-date').value;
    const category = document.getElementById('category').value;
    console.log(title, Description, due_date, category);
    if([title, Description, due_date, category].includes('')){alert("all field are required") ;return;}
    else{
        const todo = {
            title: title,
            category: category,
            Description: Description,
            due_date: due_date,
            done: false,
            createdAt: new Date().getTime()
        };
         todos.push(todo);
        //  localStorage.setItem('todos', JSON.stringify(todos));
         DisplayTodos();
         this.reset();
    }
   
});

(()=>{
    const ul = document.getElementsByClassName('ul-list');
    if(todos.length === 0){
        ul[0].innerHTML = `<li> No todos</li>`;
        return
    }
    
})()
function DisplayTodos(){
    const ul = document.getElementsByClassName('ul-list');
   ul[0].innerHTML = '';
    todos.forEach((todo)=>{
        const li = document.createElement('li');
        li.innerHTML = `
         <div class="li-right">
                                <h2 >
                                ${todo.title}
                                </h2>
                                <p>${todo.Description}</p>
                                <br>
                                <p>Due: ${todo.due_date}</p>
                                <p>${todo.category}</p>
                               
                              </div>
                              <div class="li-left">
                                <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
                               
                                <button class="check" > <i class="fa-solid fa-check"></i> </button> 
                                <button class="delete"> <i class="fa-solid fa-trash"></i> </button>
                              </div>`
        ul[0].appendChild(li);
    })
}













// Calendar JS


const month= document.querySelector('.month')
const day= document.querySelector('.day')
const date= document.querySelector('.date')
const year= document.querySelector('.year')

const today = new Date();
month.innerHTML = today.toLocaleString('default',{month : 'long'})
day.innerHTML = today.toLocaleString('default',{weekday : 'long'});
date.innerHTML = today.getDate();
year.innerHTML = today.getFullYear();