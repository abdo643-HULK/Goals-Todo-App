function List({ items = {}, remove, toggle }) {
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
		this.input.value = '';
		const { store } = this.props;
		console.log(('addItem', name));
		store.dispatch(
			addTodoAction({
				name,
				complete: false,
				id: generateId(),
			})
		);
	};

	removeItem = (todo) => {
		this.props.store.dispatch(removeTodoAction(todo.id));
	};

	toggleItem = (id) => {
		this.props.store.dispatch(toggleTodoAction(id));
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
		this.input.value = '';
		const { store } = this.props;
		store.dispatch(
			addGoalAction({
				id: generateId(),
				name,
			})
		);
	};

	removeItem = (goal) => {
		this.props.store.dispatch(removeTodoAction(goal.id));
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
		store.subscribe(() => this.forceUpdate());
	}
	render() {
		const { store } = this.props;
		const { todos, goals } = store.getState();
		return (
			<div>
				<Todos todos={todos} store={store} />
				<Goals goals={goals} store={store} />
			</div>
		);
	}
}

ReactDOM.render(<App store={store} />, document.getElementById('app'));
