const todoTemplate = {
    isDone: false
};

const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
};

function isValidProjectName(input) {
    return !!input;
}

function isValidPriority(input) {
    return !!input;
}

export function formulateTodo(title, project, priority) {
    return {
        ...todoTemplate,
        title: title,
        project: isValidProjectName(project) ? project : "Inbox",
        priority: isValidPriority(priority) ? priority : 4
    }
}

export function addTodo(title, project, priority) {
    return {
        type: "ADD_TODO",
        payload: {
            ...todoTemplate,
            id: generateKey(title),
            title: title,
            project: isValidProjectName(project) ? project : "Inbox",
            priority: isValidPriority(priority) ? priority : 4
        }
    }
}

export function removeTodo(id) {
    return {
        type: "REMOVE_TODO",
        payload: id
    }
}

export function toggleTodo(id) {
    return {
        type: "TOGGLE_TODO",
        payload: id
    }
}