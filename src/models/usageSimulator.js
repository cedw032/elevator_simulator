import {UP, DOWN} from '../constants/direction';
import provideDispatcher from '../utils/dispatcher'

const provideUsageSimulator = (elevator, floors) => {

	let unsubscribeFromTimePasses;
	let spawnChance = 0.16;

	const toggle = () => {

		if (unsubscribeFromTimePasses) {
			unsubscribeFromTimePasses();
			unsubscribeFromTimePasses = undefined;
			dispatch.toggle(false);
			return;
		}

		unsubscribeFromTimePasses = elevator.on.timePasses(passTime);
		dispatch.toggle(true);

	};

	const spawn = () => {
		
		const randomInteger = (min, max) => 
			Math.round((max - min) * Math.random()) + min;

		const randomFloor = () => randomInteger(
			floors[0], 
			+floors.slice(-1)
		);

		const entering = 1;
		const exiting = -1;

		let origin = 0;
		let destination = 0;

		switch (randomInteger(entering, exiting)) {
			case entering:
				origin = floors[0];
				destination = randomFloor();
				break;

			case exiting:
				origin = randomFloor();
				destination = floors[0];
				break;

			default:
				origin = randomFloor();
				destination = randomFloor();
				break;
		}

		if (origin === destination) return;

		const direction = origin < destination ? UP : DOWN;

		let destinationEntered = false;

		const cancelListeners = () => {
			cancelResetListener();
			cancelDoorsOpenListener();
		}

		const cancelResetListener = elevator.on.reset(cancelListeners);

		const cancelDoorsOpenListener = elevator.on.doorsOpen((floor, elevatorDirection, canChangeDirection) => {
			if (!destinationEntered && floor === origin) {
				if (canChangeDirection || elevatorDirection === direction) {
					elevator.addDestination(destination);		
					destinationEntered = true;
					return;
				}
			}

			if (destinationEntered && floor === destination) {
				elevator.allowDoorsToClose();
				cancelListeners();
			}
		});

		elevator.requestElevator(origin, direction);
		
	}

	const passTime = () => {

		if (Math.random() < spawnChance) {
			spawn();
		}

	};

	const {dispatch, on} = provideDispatcher(['toggle']);

	return {
		toggle,
		spawn,
		on,
	};

}

export default provideUsageSimulator;