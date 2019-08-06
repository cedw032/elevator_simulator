import {useState} from 'react';

const useForceUpdate = () => {
	const [, update] = useState();
	return () => update({});
}

export default useForceUpdate;