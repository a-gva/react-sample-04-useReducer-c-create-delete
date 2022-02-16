import { useState, useReducer } from 'react'
import './App.css'
import Todo from './Todo.jsx'



// Avoid hardcoded strings
// All CAPS = global non change variable
export const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo'
}

// 
function reducer(todos, action) {
    // ACTION: passed to dispatch function
    // STATE: current state
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            // 3 = PAYLOAD is handled as new Todo
            return [...todos, newTodo(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return todos.map(todo => {
                if (todo.id === action.payload.id) {
                    // reverse polaryty of 'complete' flag
                    return { ...todo, complete: !todo.complete }
                }
                return todo
            })
        case ACTIONS.DELETE_TODO:
            return todos.filter(todo => todo.id !== action.payload.id)
        default:
            return todo
    }
}


function newTodo(name) {
    return { id: Date.now(), name: name, complete: false }
}

function App() {
    // STATE = count: 0 ;  
    // dispatch: do something with
    const [todos, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        // PAYLOAD is an object that contains all the values we need to perform the action
        // 2 = NAME is handled as PAYLOAD.. payload will be used in reduce switch case (action.payload.name)
        // DISPATCH takes different actions and different parameters // add, delete, update todos
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } })
        setName('')
    }

    console.log(todos)

    return (
        <>
            <header>
                <h1>Quais os seus compromissos para hoje?</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        {/* 1 = name is set */}
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </form>
                    {todos.map(todo => {
                        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                    })}
                </div>
            </header>
        </>
    )
}

export default App
