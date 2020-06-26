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
		const { store } = this.props;
		return API.saveTodo(name)
			.then((todo) => {
				store.dispatch(addTodoAction(todo));
				this.input.value = '';
			})
			.catch(() => {
				alert('There was an error');
			});
	};

	removeItem = (todo) => {
		this.props.store.dispatch(handleDeleteTodo(todo));
	};

	toggleItem = (id) => {
		this.props.store.dispatch(toggleTodoAction(id));
		return API.saveTodoToggle(id).catch(() => {
			this.props.store.dispatch(toggleTodoAction(id));
			alert('An error occured');
		});
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
		const { store } = this.props;
		return API.saveGoal(name)
			.then((goal) => {
				store.dispatch(addGoalAction(goal));
				this.input.value = '';
			})
			.catch(() => {
				alert('There was an error');
			});
	};

	removeItem = (goal) => {
		this.props.store.dispatch(removeTodoAction(goal.id));
		return API.deleteTodo(goal.id).catch(() => {
			this.props.store.dispatch(addTodoAction(goal));
			alert('An error occured');
		});
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
		const { store } = this.props;
		Promise.all([API.fetchTodos(), API.fetchGoals()]).then(
			([todos, goals]) => {
				store.dispatch(receiveDataAction(todos, goals));
			}
		);
		store.subscribe(() => this.forceUpdate());
	}

	render() {
		const { store } = this.props;
		const { todos, goals, loading } = store.getState();
		if (loading) {
			return <h3>Loading...</h3>;
		}
		return (
			<div>
				<Todos todos={todos} store={store} />
				<Goals goals={goals} store={store} />
			</div>
		);
	}
}

ReactDOM.render(<App store={store} />, document.getElementById('app'));
