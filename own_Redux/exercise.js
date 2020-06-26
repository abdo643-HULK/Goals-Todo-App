/* Create An Reducer Function*/

function appReducer(state, action) {
	if (action.type === 'DELETE_FLAVOR') {
		return state.filter((i) => i.flavor !== action.flavor);
	}
	return state;
}

appReducer(
	[
		{ flavor: 'Chocolate', count: 36 },
		{ flavor: 'Vanilla', count: 210 },
	],
	{ type: 'DELETE_FLAVOR', flavor: 'Vanilla' }
);

/* Create An Action Creator
 *
 * You need to create an action creator called 'mealCreator' that should:
 *   - Accept an id
 *   - Return a Redux action with a 'type' property that has a value of 'CREATE_MEAL'
 *   - Include the id passed to the action creator
 */
const CREATE_MEAL = 'CREATE_MEAL';
function mealCreator(id) {
	return {
		type: CREATE_MEAL,
		id,
	};
}
