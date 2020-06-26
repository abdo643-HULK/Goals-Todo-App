const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

//AppCode
function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo,
	};
}

function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id,
	};
}

function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id,
	};
}

function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal,
	};
}

function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id,
	};
}

function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return state.concat([action.todo]);
		case REMOVE_TODO:
			return state.filter((todo) => todo.id !== action.id);
		case TOGGLE_TODO:
			return state.map(
				(todo) =>
					todo.id !== action.id
						? todo
						: Object.assign({}, todo, { complete: !todo.complete }) //or
				//{ ...todo, complete: !todo.complete }
			);
		default:
			return state;
	}
}

const checker = (store) => (next) => (action) => {
	if (
		action.type === ADD_TODO &&
		action.todo.name.toLowerCase().includes('bitcoin')
	) {
		return alert('Nope. That is a bad idea');
	}
	if (
		action.type === ADD_GOAL &&
		action.goal.name.toLowerCase().includes('bitcoin')
	) {
		return alert('Nope. That is a bad idea');
	}
	return next(action);
};

const logger = (store) => (next) => (action) => {
	console.group(action.type);
	console.log('action:', action);
	const result = next(action);
	console.log('new state : ', store.getState());
	console.groupEnd();
	return result;
};

// var check = checker(store); //make check function with store with new closure
// var applyNext = check(dispatch); //check action and if okay pass action to dispatch
//and return result and assign to applynext

// function checker(store) {
// 	return function (next) {
// 		return function (action) {
// 			if (
// 				action.type === ADD_TODO &&
// 				action.todo.name.toLowerCase().includes('bitcoin')
// 			) {
// 				return alert('Nope. That is a bad idea');
// 			}
// 			if (
// 				action.type === ADD_GOAL &&
// 				action.goal.name.toLowerCase().includes('bitcoin')
// 			) {
// 				return alert('Nope. That is a bad idea');
// 			}
// 			return next(action);
// 		};
// 	};
// }

function goals(state = [], action) {
	switch (action.type) {
		case ADD_GOAL:
			return state.concat([action.goal]);
		case REMOVE_GOAL:
			return state.filter((goal) => goal.id !== action.id);
		default:
			return state;
	}
}

const store = Redux.createStore(
	Redux.combineReducers({
		todos,
		goals,
	}),
	Redux.applyMiddleware(checker, logger)
);

store.subscribe(() => {
	console.log('The new state is : ', store.getState());
	const { goals, todos } = store.getState();
	document.getElementById('goals').innerHTML = '';
	document.getElementById('todos').innerHTML = '';
	todos.forEach(addTodoToDOM);
	goals.forEach(addGoalToDOM);
});

function addTodo() {
	const input = document.getElementById('todo');
	const name = input.value;
	input.value = '';
	store.dispatch(
		addTodoAction({
			name,
			complete: false,
			id: generateId(),
		})
	);
}

function addGoal() {
	const input = document.getElementById('goal');
	const name = input.value;
	input.value = '';
	store.dispatch(
		addGoalAction({
			id: generateId(),
			name,
		})
	);
}

function createRemoveButton(onClick) {
	const removeBtn = document.createElement('button');
	removeBtn.textContent = 'x';
	removeBtn.addEventListener('click', onClick);
	return removeBtn;
}

function toggleTodo(id) {
	store.dispatch(toggleTodoAction(id));
}

function addTodoToDOM(todo) {
	const list = document.getElementById('todos');
	const node = document.createElement('li');
	const toogleBtn = document.createElement('button');
	toogleBtn.textContent = 'toggle';
	toogleBtn.addEventListener('click', () => {
		toggleTodo(todo.id);
	});
	const text = document.createTextNode(todo.name);
	const completion = document.createElement('p');
	completion.textContent = todo.complete ? 'finished' : 'not finished';
	const removeBtn = createRemoveButton(() => {
		store.dispatch(removeTodoAction(todo.id));
	});

	list.appendChild(node);
	node.appendChild(text);
	list.appendChild(completion);
	list.appendChild(removeBtn);
	list.appendChild(toogleBtn);
}

function addGoalToDOM(goal) {
	const list = document.getElementById('goals');
	const node = document.createElement('li');
	const text = document.createTextNode(goal.name);
	const removeBtn = createRemoveButton(() => {
		store.dispatch(removeTodoAction(goal.id));
	});

	list.appendChild(node);
	node.appendChild(text);
	list.appendChild(removeBtn);
}

function generateId() {
	return (
		Math.random().toString(36).substring(2) +
		new Date().getTime().toString(36)
	);
}
