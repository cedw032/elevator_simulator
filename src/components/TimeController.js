import React, {useEffect} from 'react';
import cx from 'classnames';
import useAsyncState from '../hooks/useAsyncState';

const AUTOPLAY_INTERVALS = [800, 140];
const AUTOPLAY_OPEN_TIMEOUT = 5;

const TimeController = ({elevator}) => {

	const [asyncAutoplay, setAutoplay] = useAsyncState(true);
	const [asyncAutoplaySpeed, setAutoplaySpeed] = useAsyncState(0);

	useEffect(() => {
		if (asyncAutoplay.value) startAutoplay();
	}, []);

	const applySingleTimestep = () => {
		setAutoplay(false);
		elevator.elapseTime();
	}

	const handleAutoplayButtonClick = () => {
		if (asyncAutoplay.value) {
			changePlaySpeed();
			return;
		}

		startAutoplay();
	}

	const changePlaySpeed = () => {
		setAutoplaySpeed((asyncAutoplaySpeed.value + 1) % AUTOPLAY_INTERVALS.length);
		console.log('autoplay speed', asyncAutoplaySpeed.value);
	};

	const startAutoplay = () => {
		setAutoplay(true);
		elevator.setOpenTimeout(AUTOPLAY_OPEN_TIMEOUT);
		setTimeout(applyAutoplayTimestep);
	}

	const applyAutoplayTimestep = () => {
		if (asyncAutoplay.value) {
			elevator.elapseTime();
			setTimeout(
				applyAutoplayTimestep, 
				AUTOPLAY_INTERVALS[asyncAutoplaySpeed.value]
			);
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
				children={asyncAutoplaySpeed.value ? '>>' : '>'}
				className={cx(asyncAutoplay.value && 'toggled')}
				onClick={handleAutoplayButtonClick}/>
		</div>
	);
};

export default TimeController;