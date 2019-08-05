import {useEffect} from 'react';
import useForceUpdate from './useForceUpdate';

const useForceUpdateOnEvents = (subscribes) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		subscribes.forEach(subscribe => subscribe(forceUpdate));
	}, []);
}

export default useForceUpdateOnEvents;