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

const Context = React.createContext();
const ConnectedApp = connect((state) => ({ loading: state.loading }))(App);
const ConnectedGoals = connect((state) => ({ goals: state.goals }))(Goals);
const ConnectedTodos = connect((state) => ({ todos: state.todos }))(Todos);

function connect(mapStateToProps) {
	return (Component) => {
		class Receiver extends React.Component {
			componentDidMount() {
				const { subscribe } = this.props.store;
				this.unsubscribe = subscribe(() => {
					this.forceUpdate();
				});
			}
			componentWillUnmount() {
				this.unsubscribe;
			}
			render() {
				const { dispatch, getState } = this.props.store;
				const state = getState();
				const stateNeeded = mapStateToProps(state);
				return <Component {...stateNeeded} dispatch={dispatch} />;
			}
		}
		class ConnectedComponent extends React.Component {
			render() {
				return (
					<Context.Consumer>
						{(store) => <Receiver store={store} />}
					</Context.Consumer>
				);
			}
		}
		return ConnectedComponent;
	};
}

// class ConnectedGoals extends React.Component {
// 	render() {
// 		return (
// 			<Context.Consumer>
// 				{(store) => {
// 					const { goals } = store.getState();
// 					<Goals dispatch={store.dispatch} goals={goals} />;
// 				}}
// 			</Context.Consumer>
// 		);
// 	}
// }

// class ConnectedTodos extends React.Component {
// 	render() {
// 		return (
// 			<Context.Consumer>
// 				{(store) => {
// 					const { todos } = store.getState();
// 					<Todos dispatch={store.dispatch} todos={todos} />;
// 				}}
// 			</Context.Consumer>
// 		);
// 	}
// }

// class ConnectedApp extends React.Component {
// 	render() {
// 		return (
// 			<Context.Consumer>
// 				{(store) => <App store={store} />}
// 			</Context.Consumer>
// 		);
// 	}
// }

class Provider extends React.Component {
	render() {
		const { store } = this.props;

		return (
			<Context.Provider value={store}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<ConnectedApp />
	</Provider>,
	document.getElementById('app')
);
