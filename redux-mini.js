function createStore (reducer) {
    let state
    if(localStorage['state']){
      state = JSON.parse(localStorage['state'])
    }
    let listeners = []
  
    const getState = function(){
      return state
    }
  
    const subscribe = function(listener){
      listeners.push(listener)
      return () => {
        listeners = listeners.filter((l) => l !== listener)
      }
    }
  
    const dispatch = function(action){
      state = reducer(state, action)
      localStorage['state'] = JSON.stringify(state)
      listeners.forEach((listener) => listener())
    }
  
    return {
      getState,
      subscribe,
      dispatch,
    }
  }
  
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const TOGGLE_GOAL = 'TOGGLE_GOAL'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function addTodoAction (todo) {
    return {
      type: ADD_TODO,
      todo,
    }
  }
  
  function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id,
    }
  }
  
  function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }
  function toggleGoalAction (id) {
    return {
      type: TOGGLE_GOAL,
      id,
    }
  }
  
  function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal,
    }
  }
  
  function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }

function app(state={},action){
    return {
        todos:todos(state.todos,action), 
        goals:goals(state.goals,action) 
    }
}
function todos(state=[],action="none"){
    switch (action.type) {
        case ADD_TODO:
            return state.concat([action.todo])
        case REMOVE_TODO:
            return state.filter((todo)=>todo.id!=action.id)
        case TOGGLE_TODO:
            return state.map((todo) => todo.id != action.id ? todo :
            Object.assign({}, todo, { complete: !todo.complete }))
        default :
          return state
    }
}
function goals (state = [], action="none") {
    switch(action.type) {
      case ADD_GOAL :
        return state.concat([action.goal])
      case REMOVE_GOAL :
        return state.filter((goal) => goal.id != action.id)
      case TOGGLE_GOAL:
        return state.map((goal) => goal.id != action.id ? goal :
          Object.assign({}, goal, { complete: !goal.complete }))
      default :
        return state
    }
  }
