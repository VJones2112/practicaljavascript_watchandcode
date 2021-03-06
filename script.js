
        let todoList = {
            // when setting value of property as below, don't end with a semicolon.
            todos: [],
            //adding a todo item into the list and displaying it.
            addTodo: function(todoText) {
                this.todos.push({
                    // First todoText is name of property and 2nd is the parameter w/in function.
                    todoText: todoText,
                    completed: false
                    // if (event.keyCode === 13) {
                    // document.getElementById('addTodoTextInput').click();
                    // }
                });
            },
            changeTodo: function(position, todoText) {
                // Below we are changing the todoText based on a position by passing in todoText.
                this.todos[position].todoText = todoText;
            },
            deleteTodo: function(position) {
                this.todos.splice(position, 1);
            },
            toggleCompleted: function(position) {
                let todo = this.todos[position];
                todo.completed = !todo.completed;
            },
            toggleAll: function() {
                // debugger;
                let totalTodos = this.todos.length;
                let completedTodos = 0;
                this.todos.forEach(function(todo) {
                    if (todo.completed === true) {
                        completedTodos++;
                    }
                });
                this.todos.forEach(function(todo) {
                    if (completedTodos === totalTodos) {
                        todo.completed = false;
                    } else {
                        todo.completed = true;
                    }
                });
            }
        };

        let handlers = {
            addTodo: function() {
                let addTodoTextInput = document.getElementById('addTodoTextInput');
                todoList.addTodo(addTodoTextInput.value);
                addTodoTextInput.value = '';
                //The line above is to clear the input after you type something in rather than having that text stay there.
                view.displayTodos();
            },
            changeTodo: function() {
                let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
                let changeTodoTextInput = document.getElementById('changeTodoTextInput');
                todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
                //Above if we had used .value it would return a string, not number.
                changeTodoTextInput.value = '';
                changeTodoPositionInput = '';
                view.displayTodos();
            },
            deleteTodo: function(position) {
                todoList.deleteTodo(position);
                view.displayTodos();
            },
            toggleCompleted: function() {
                let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
                todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
                toggleCompletedPositionInput.value = '';
                view.displayTodos();
            },
            toggleAll: function() {
                todoList.toggleAll();
                view.displayTodos();
            }
        };

        //View doesn't do anything but render data to the screen.
        let view = {
            displayTodos: function() {
                let todoUl = document.querySelector('ul');
                todoUl.innerHTML = '';
                //The above sets whatever html was created to clear so that view.displayTodos() doesn't keep adding bullets.

                //Below creates a list item for each item in the todos array and then append it to the todos ul.
                todoList.todos.forEach(function(todo, position) {
                    let todoLi = document.createElement('li');
                    // //Created variable above so we don't have to repeat code.
                    let todoTextWithCompletion = '';
                    if (todo.completed === true) {
                        todoTextWithCompletion = '(x) ' + todo.todoText;
                    } else {
                        todoTextWithCompletion = '( ) ' + todo.todoText;
                    }
                    // //We can use id because we are dealing with position. Only one item will have position 0, etc. Thus the id = position in array.
                    todoLi.id = position;
                    todoLi.textContent = todoTextWithCompletion;
                    // //Below code added a delete button each time an li is created.
                    todoLi.appendChild(this.createDeleteButton());
                    todoUl.appendChild(todoLi);
                }, this);
            },
            // <i class="fa fa-trash-o" aria-hidden="true"></i>
            createDeleteButton: function() {
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'X';
                deleteButton.className = 'deleteButton';
                return deleteButton;
            },
            setUpEventListeners: function() {
                let todosUl = document.querySelector('ul');
                todosUl.addEventListener('click', function(event) {
                    let elementClicked = event.target;
                    if (elementClicked.className === 'deleteButton') {
                        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
                    }
                });
            }
        };
        view.setUpEventListeners();
