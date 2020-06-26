import React from 'react';
import { handleAddGoal, handleDeleteGoal } from '../actions/goals';
import List from './List';
import { connect } from 'react-redux';

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

export default connect((state) => ({ goals: state.goals }))(Goals);
