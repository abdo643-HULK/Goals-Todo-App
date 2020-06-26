import React from 'react';
import {
	handleAddTodo,
	handleDeleteTodo,
	handleToggleTodo,
} from '../actions/todos';
import List from './List';
import { connect } from 'react-redux';

class Todos extends React.Component {
	addItem = (e) => {
		e.preventDefault();
		const name = this.input.value;
		const { dispatch } = this.props;
		dispatch(handleAddTodo(name, () => (this.input.value = '')));
	};

	removeItem = (todo) => {
		this.props.dispatch(handleDeleteTodo(todo));
	};

	toggleItem = (id) => {
		this.props.dispatch(handleToggleTodo(id));
	};

	render() {
		return (
			<div>
				<label>
					<h1>Todo List</h1>
					<input
						type="text"
						placeholder="Add Todo"
						ref={(input) => (this.input = input)}
					/>
					<button onClick={this.addItem}>Add Todo</button>
				</label>
				<List
					toggle={this.toggleItem}
					remove={this.removeItem}
					items={this.props.todos}
				/>
			</div>
		);
	}
}

export default connect((state) => ({ todos: state.todos }))(Todos);
