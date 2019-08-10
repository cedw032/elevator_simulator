import React, {useEffect} from 'react';
import cx from 'classnames';
import useAsyncState from '../hooks/useAsyncState';
import Button from './Button';

const AUTOPLAY_INTERVALS = [800, 140];
const AUTOPLAY_OPEN_TIMEOUT = 5;

const TimeController = ({passTime, setOpenTimeout, setQuickAnimations}) => {

	const [asyncAutoplay, setAutoplay] = useAsyncState(true);
	const [asyncAutoplaySpeed, setAutoplaySpeed] = useAsyncState(0);

	useEffect(() => {
		if (asyncAutoplay.value) startAutoplay();
	}, []);

	const applySingleTimestep = () => {
		setAutoplay(false);
		passTime();
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
		setQuickAnimations(asyncAutoplaySpeed.value);
	};

	const startAutoplay = () => {
		setAutoplay(true);
		setOpenTimeout(AUTOPLAY_OPEN_TIMEOUT);
		setTimeout(applyAutoplayTimestep);
	}

	const applyAutoplayTimestep = () => {
		if (asyncAutoplay.value) {
			passTime();
			setTimeout(
				applyAutoplayTimestep, 
				AUTOPLAY_INTERVALS[asyncAutoplaySpeed.value]
			);
			return;
		}

		setOpenTimeout(0);
	}

	return (
		<div className='row'>
			<Button 
				children='|>'
				onClick={applySingleTimestep}/>

			<Button 
				children={asyncAutoplaySpeed.value ? '>>' : '>'}
				className={cx(asyncAutoplay.value && 'toggled')}
				onClick={handleAutoplayButtonClick}/>
		</div>
	);
};

export default TimeController;