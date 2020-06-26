import React from 'react';
import Goals from './Goals';
import Todos from './Todos';

import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';

class App extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(handleInitialData());
	}

	render() {
		if (this.props.loading) {
			return <h3>Loading...</h3>;
		}

		return (
			<div>
				<Goals />
				<Todos />
			</div>
		);
	}
}

export default connect((state) => ({
	loading: state.loading,
}))(App);
