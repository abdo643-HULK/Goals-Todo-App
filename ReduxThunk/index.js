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
		store.dispatch(handleAddTodo(name, () => (this.input.value = '')));
	};

	removeItem = (todo) => {
		this.props.store.dispatch(handleDeleteTodo(todo));
	};

	toggleItem = (id) => {
		this.props.store.dispatch(handleToggleTodo(id));
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
		store.dispatch(handleAddGoal(name, () => (this.input.value = '')));
	};

	removeItem = (goal) => {
		this.props.store.dispatch(handleDeleteGoal(goal));
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

		store.dispatch(handleInitialData());

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
