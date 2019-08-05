import {useState} from 'react';

let state;

const useAsyncState = (initial) => {

	if (!state) state = {value: initial};

	const [o, setState] = useState();

	const updateValue = (value) => {
		if (value !== state.value) {
			state.value = value;
			setState({});
		}
	};

	return [state, updateValue];
}

export default useAsyncState;