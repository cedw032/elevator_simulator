import {useEffect} from 'react';
import useForceUpdate from './useForceUpdate';

const useForceUpdateOnEvents = (subscribeMethods) => {
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const unsubscribeMethods = [];
		subscribeMethods.forEach(
			subscribe => unsubscribeMethods.push(subscribe(forceUpdate))
		);

		return () => unsubscribeMethods.forEach(unsubscribe => unsubscribe());
	}, []);
}

export default useForceUpdateOnEvents;