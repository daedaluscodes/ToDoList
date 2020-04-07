let todoList = {
    todos: [],
    addToDo: function(todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeToDo: function(index, todoText) {
        this.todos[index].todoText = todoText;
    },    
    deleteToDo: function(index) {
        this.todos.splice(index, 1);
    },
    toggleCompleted: function(index) {
        let todo = this.todos[index];
        todo.completed = !todo.completed;
    },
    toggleAll: function() {
        let totalTodos = this.todos.length;
        let completedTodos = 0;
        
        this.todos.forEach(function(todo) {
            if(todo.completed === true) {
                completedTodos++;
            }
        });
        
        this.todos.forEach(function(todo) {
            if(completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        })
    }
}

let handlers = {
    addToDo: function() { 
        let addToDoTextInput = document.getElementById('addToDoText');
        todoList.addToDo(addToDoTextInput.value);
        addToDoTextInput.value = '';
        view.displayToDos();
    },
    changeToDo: function() {
        let changeToDoIndex = document.getElementById('changeToDoIndexInput');
        let changeToDoText = document.getElementById('changeToDoTextInput');
        todoList.changeToDo(changeToDoIndex.valueAsNumber, changeToDoText.value);
        changeToDoIndex.value = '';
        changeToDoText.value = '';
        view.displayToDos();

    },
    deleteToDo: function(index) {
        todoList.deleteToDo(index);
        view.displayToDos();
    },
    toggleCompleted: function() {
        let toggleCompletedIndex = document.getElementById('toggleCompletedIndex');
        todoList.toggleCompleted(toggleCompletedIndex.valueAsNumber);
        toggleCompletedIndex.value = '';
        view.displayToDos();
    },
    toggleAll: function() {todoList.toggleAll();
        view.displayToDos();
    } 
};

let view = {
    displayToDos: function() {
        let todoUl = document.querySelector('ul');
        todoUl.innerHTML = '';
        
        todoList.todos.forEach(function(todo, index) {
            let todoLi = document.createElement('li');
            let todoTextWithCompletion = '';

            if(todo.completed === true) {   
                todoTextWithCompletion = '(x) ' + todo.todoText;
                } else {
                    todoTextWithCompletion = '( ) ' + todo.todoText;
                }
            todoLi.id = index;
            todoLi.textContent = todoTextWithCompletion;
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi);
        }, this)
    },
    createDeleteButton: function() {
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListeners: function() {
        let todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function(event) {
            let elementClicked = event.target;
            
            if(elementClicked.className === 'deleteButton') {
                handlers.deleteToDo(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListeners();
