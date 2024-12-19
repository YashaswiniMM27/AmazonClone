const initialTodo = JSON.parse(localStorage.getItem('todo')) || [];
const todoList = initialTodo;

        function keyDownEnterEvent(){
            if(event.key === 'Enter')
            {
                addTodo();
            }
        }

        renderTodoList();

        function renderTodoList(){
            let todoHTML = '';
            
            todoList.forEach((todo, index) => {
                    const {name, dueDate} = todo;
                    const html = `<div style="padding-left:5px"> ${name}</div>
                                    <div style="padding-left:5px">${dueDate}</div>
                                    <div>
                                        <button class="deleteBTN" onclick="deleteTodo(${index})">Delete</button>
                                    </div>`;
                                    
                    todoHTML += html;
                }
            )
            
            document.querySelector('.js-listTodo').innerHTML = todoHTML;
        }

        function deleteTodo(index) {
            todoList.splice(index, 1);
            localStorage.setItem('todo', JSON.stringify(todoList));
            renderTodoList();
        }
        

        function addTodo(){
            const errorElement = document.querySelector('.js-error');

            const inputElement = document.querySelector('.js-input');
            const dateInputElement = document.querySelector('.js-datePicker');
            const name = inputElement.value;
            const dueDate = dateInputElement.value;

            errorElement.innerHTML = '';

            if (name === '' || dueDate === '') {
                errorElement.innerHTML = 'Please fill out both the task and due date.';
                return;
            }

            todoList.push({name, dueDate});

            localStorage.setItem('todo', JSON.stringify(todoList));

            renderTodoList();

            inputElement.value = '';
            dateInputElement.value = '';
        }