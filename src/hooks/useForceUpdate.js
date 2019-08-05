import {useState} from 'react';

const useForceUpdate = () => {
	const [o, update] = useState();
	return () => update({});
}

export default useForceUpdate;