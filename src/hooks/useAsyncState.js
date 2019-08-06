import {useState} from 'react';
import useForceUpdate from './useForceUpdate';

let state;

const useAsyncState = (initial) => {

	if (!state) state = {value: initial};

	const forceUpdate = useForceUpdate();

	const updateValue = (value) => {
		if (value !== state.value) {
			state.value = value;
			forceUpdate();
		}
	};

	return [state, updateValue];
}

export default useAsyncState;