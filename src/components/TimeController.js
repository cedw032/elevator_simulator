import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import useAsyncState from '../hooks/useAsyncState';

const AUTOPLAY_INTERVAL = 100;
const AUTOPLAY_OPEN_TIMEOUT = 30;

const TimeController = ({elevator}) => {

	const [asyncAutoplay, setAutoplay] = useAsyncState(true);

	useEffect(() => {
		if (asyncAutoplay.value) startAutoplay();
	}, []);

	const applySingleTimestep = () => {
		setAutoplay(false);
		elevator.elapseTime();
	}

	const startAutoplay = () => {
		setAutoplay(true);
		elevator.setOpenTimeout(AUTOPLAY_OPEN_TIMEOUT);
		setTimeout(applyAutoplayTimestep);
	}

	const applyAutoplayTimestep = () => {
		if (asyncAutoplay.value) {
			elevator.elapseTime();
			setTimeout(applyAutoplayTimestep, AUTOPLAY_INTERVAL);
			return;
		}

		elevator.setOpenTimeout(0);
	}

	return (
		<div className='row'>
			<button 
				children='|>'
				onClick={applySingleTimestep}/>

			<button 
				children='>>'
				className={cx(asyncAutoplay.value && 'toggled')}
				onClick={startAutoplay}/>
		</div>
	);
};

export default TimeController;