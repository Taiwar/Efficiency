export default function reducer (state={
    todos: [],
    error: null
}, action){
    switch(action.type) {
        case "ADD_TODO": {
            return {
                ...state,
                todos: [...state.todos, action.payload],
            }
        }
        case "TOGGLE_TODO": {
            return {
                ...state,
                todos: state.todos.map(todo =>
                    (todo.id === action.payload)
                        ? {...todo, isChecked: !todo.isChecked}
                        : todo
                )
            }
        }
        case "REMOVE_TODO": {
            return {
                ...state,
                todos: state.todos.filter(todos => {
                    return todos.id !== action.payload;
                })
            }
        }
        default: {
            return state;
        }
    }
}