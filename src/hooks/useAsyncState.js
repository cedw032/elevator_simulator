import {useState} from 'react';
import useForceUpdate from './useForceUpdate';

let states = [];

const useAsyncState = (initial) => {

	const forceUpdate = useForceUpdate();
	const [id] = useState(states.length);
	
	let state = states[id];
	if (!state) {
		state = {value: initial};
		states.push(state);
	}

	const updateValue = (value) => {
		if (value !== state.value) {
			state.value = value;
			forceUpdate();
		}
	};

	return [state, updateValue];
}

export default useAsyncState;