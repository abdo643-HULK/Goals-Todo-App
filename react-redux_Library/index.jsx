const { func } = require('prop-types');
const { Component } = require('react');

function List({ items = [], remove, toggle }) {
	return (
		<ul>
			{items.map((item) => (
				<li key={item.id}>
					<span
						style={{
							textDecoration: item.complete && 'line-through',
						}}
					>
						{item.name}
					</span>
					{toggle && (
						<button onClick={() => toggle(item.id)}>toggle</button>
					)}
					<button onClick={() => remove(item)}>X</button>
				</li>
			))}
		</ul>
	);
}

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

class Goals extends React.Component {
	addItem = (e) => {
		e.preventDefault();
		const name = this.input.value;
		const { dispatch } = this.props;
		dispatch(handleAddGoal(name, () => (this.input.value = '')));
	};

	removeItem = (goal) => {
		this.props.dispatch(handleDeleteGoal(goal));
	};

	render() {
		return (
			<div>
				<label>
					<h1>Goal List</h1>
					<input
						type="text"
						placeholder="Add Goal"
						ref={(input) => (this.input = input)}
					/>
					<button onClick={this.addItem}>Add Goal</button>
				</label>
				<List remove={this.removeItem} items={this.props.goals} />
			</div>
		);
	}
}

class App extends React.Component {
	componentDidMount() {
		// const { store } = this.props;
		// store.dispatch(handleInitialData());
		// store.subscribe(() => this.forceUpdate());

		const { dispatch } = this.props;
		dispatch(handleInitialData());
	}

	render() {
		// const { loading } = store.getState();
		if (this.props.loading) {
			return <h3>Loading...</h3>;
		}

		return (
			<div>
				<ConnectedTodos />
				<ConnectedGoals />
			</div>
		);
	}
}

const ConnectedApp = ReactRedux.connect((state) => ({
	loading: state.loading,
}))(App);
const ConnectedGoals = ReactRedux.connect((state) => ({ goals: state.goals }))(
	Goals
);
const ConnectedTodos = ReactRedux.connect((state) => ({ todos: state.todos }))(
	Todos
);

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<ConnectedApp />
	</ReactRedux.Provider>,
	document.getElementById('app')
);
