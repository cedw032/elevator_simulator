import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import Button from './Button';

const PLAY_INTERVALS = [800, 140];
const AUTOPLAY_OPEN_TIMEOUT = 5;

const TimeController = (props) => {

	const {
		passTime, 
		paused,
		play, 
		pause, 
		setPlayInterval, 
		setOpenTimeout, 
		setQuickAnimations
	} = props;

	const [playIntervalIndex, setPlayIntervalIndex] = useState(0);

	useEffect(() => {
		setPlayInterval(PLAY_INTERVALS[playIntervalIndex]);
	}, []);

	const changePlaySpeed = () => {
		const newIndex = (playIntervalIndex + 1) % PLAY_INTERVALS.length;
		setPlayInterval(PLAY_INTERVALS[newIndex]);
		setPlayIntervalIndex(newIndex);
	};

	const startPlaying = () => {
		setOpenTimeout(AUTOPLAY_OPEN_TIMEOUT);
		play();
	}

	const stopPlaying = () => {
		setOpenTimeout(0);
		pause();
	}

	return (
		<div className='row'>
			<Button 
				children={paused ? '|>' : '||'}
				onClick={() => {
					if (paused) {
						passTime();
						return;
					}

					stopPlaying();
				}}/>

			<Button 
				children={playIntervalIndex ? '>>' : '>'}
				className={cx(!paused && 'toggled')}
				onClick={() => {
					if (!paused) {
						changePlaySpeed();
						return;
					}

					startPlaying();
				}}/>
		</div>
	);
};

export default TimeController;