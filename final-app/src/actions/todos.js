import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

function addTodo(todo) {
	return {
		type: ADD_TODO,
		todo,
	};
}

function removeTodo(id) {
	return {
		type: REMOVE_TODO,
		id,
	};
}

function toggleTodo(id) {
	return {
		type: TOGGLE_TODO,
		id,
	};
}

export function handleAddTodo(name, cb) {
	return async (dispatch) => {
		try {
			const todo = await API.saveTodo(name);
			dispatch(addTodo(todo));
			cb();
		} catch (e) {
			alert('There was an error');
		}
	};
}

export function handleDeleteTodo(todo) {
	return async (dispatch) => {
		dispatch(removeTodo(todo.id));
		try {
			return API.deleteTodo(todo.id);
		} catch (e) {
			dispatch(addTodo(todo));
			alert('An error occured');
		}
	};
}

export function handleToggleTodo(id) {
	return async (dispatch) => {
		dispatch(toggleTodo(id));
		try {
			return API.saveTodoToggle(id);
		} catch (e) {
			dispatch(toggleTodo(id));
			alert('An error occured');
		}
	};
}

// function addTodo(todo) {
// 	return {
// 		type: ADD_TODO,
// 		todo,
// 	};
// }

// function removeTodo(id) {
// 	return {
// 		type: REMOVE_TODO,
// 		id,
// 	};
// }

// function toggleTodo(id) {
// 	return {
// 		type: TOGGLE_TODO,
// 		id,
// 	};
// }

// export function handleAddTodo(name, cb) {
// 	return (dispatch) => {
// 		return API.saveTodo(name)
// 			.then((todo) => {
// 				dispatch(addTodo(todo));
// 				cb();
// 			})
// 			.catch(() => {
// 				alert('There was an error');
// 			});
// 	};
// }

// export function handleDeleteTodo(todo) {
// 	return (dispatch) => {
// 		dispatch(removeTodo(todo.id));
// 		return API.deleteTodo(todo.id).catch(() => {
// 			dispatch(addTodo(todo));
// 			alert('An error occured');
// 		});
// 	};
// }

// export function handleToggleTodo(id) {
// 	return (dispatch) => {
// 		return API.saveTodoToggle(id).catch(() => {
// 			dispatch(toggleTodo(id));
// 			alert('An error occured');
// 		});
// 	};
// }
