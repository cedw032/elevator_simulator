import provideDispatcher from '../utils/dispatcher';

const provideClock = () => {

	let interval = 0;
	let paused = true;
	let timeout;
	
	const run = () => {
		passTime();
		timeout = setTimeout(run, interval);
	}

	const passTime = () => {
		dispatch.timePasses();
	};

	const setPaused = value => {
		paused = value;
		dispatch.pausedChanges(paused);
	}

	const {dispatch, on} = provideDispatcher([
		'timePasses',
		'pausedChanges'
	]);

	return {

		paused: () => paused,

		play: () => {
			if (!paused) return;
			run();
			setPaused(false);
		},

		pause: () => {
			if (paused) return;
			clearTimeout(timeout);
			setPaused(true);
		},

		passTime,

		setPlayInterval: value => interval = value,

		on,
	}



}

export default provideClock;