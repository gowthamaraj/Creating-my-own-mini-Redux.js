const store = createStore(app)
store.subscribe(update)
store.dispatch()
const form_list = document.getElementById('list')
const form_todo = document.getElementById('todo')
const form_goal = document.getElementById('goal')
const todo_list = document.getElementById('todo_list')
const goal_list = document.getElementById('goal_list')
const list_name = document.querySelector('.list-name p')
const list_name_block = document.querySelector('.list-name')
const spin = document.getElementById('spin')
spin.addEventListener('click',(e)=>{
    if(list_name_block.style.display === "none"){
        list_name_block.style.display = "block"
        form_list.style.display = "none"
    }else{
        list_name_block.style.display = "none"
        form_list.style.display = "flex"
    }
    
})
if(localStorage["list-name"]){
    list_name.innerHTML = `List-Name : `+ localStorage["list-name"]
    list_name_block.style.display = "block"
    form_list.style.display = "none"
}
form_list.addEventListener('submit',(e)=>{
    e.preventDefault()
    let value = document.getElementById('list-create-name').value.trim()
    localStorage["list-name"]=value;
    list_name.innerHTML = `List-Name : `+localStorage["list-name"]
    list_name_block.style.display = "block"
    form_list.style.display = "none"
})
form_todo.addEventListener('submit',(e)=>{
    e.preventDefault()
    let value = document.getElementById('todo_create').value.trim()
    store.dispatch(addTodoAction({value,id:Math.random(),complete:true}))
    e.target.reset()
})
form_goal.addEventListener('submit',(e)=>{
    e.preventDefault()
    let value = document.getElementById('goal_create').value.trim()
    store.dispatch(addGoalAction({value,id:Math.random(),complete:true}))
    e.target.reset()
})
function update(){
    let data = store.getState()
    const todo_ul = document.getElementById('todo_list')
    const goal_ul = document.getElementById('goal_list')
    todo_ul.innerHTML = ''
    goal_ul.innerHTML = ''
    data.todos.forEach((todo)=>{
        let color = todo.complete?"list-group-item-success":"list-group-item-danger"
        todo_ul.innerHTML += `<li class="list-group-item ${color}" key=${todo.id}>${todo.value}<i class="fa fa-trash" aria-hidden="true"></i></li>`
    })
    data.goals.forEach((goal)=>{
        let color = goal.complete?"list-group-item-success":"list-group-item-danger"
        goal_ul.innerHTML += `<li class="list-group-item ${color}" key=${goal.id}>${goal.value}<i class="fa fa-trash" aria-hidden="true"></i></li>`
    })
}
goal_list.addEventListener('click',(e)=>{
    if(e.target.tagName == "LI"){
    const key = e.target.getAttribute('key')
    store.dispatch(toggleGoalAction(key))
    }
    if(e.target.tagName == "I"){
        const key = e.target.parentElement.getAttribute('key')
        store.dispatch(removeGoalAction(key))
        }
})
todo_list.addEventListener('click',(e)=>{
    if(e.target.tagName == "LI"){
    const key = e.target.getAttribute('key')
    store.dispatch(toggleTodoAction(key))
    }
    if(e.target.tagName == "I"){
        const key = e.target.parentElement.getAttribute('key')
        store.dispatch(removeTodoAction(key))
        }
})

