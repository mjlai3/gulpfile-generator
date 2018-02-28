export default (state = {
		strict: true,
		es6: true
	}, action) => {
  switch (action.type) {
    case 'TOGGLE_STRICT':
      return {
      	...state,
      	strict: !state.strict
      }
    case 'TOGGLE_ES6':
      return {
      	...state,
      	es6: !state.es6
      }
    default:
      return state
  }
}
