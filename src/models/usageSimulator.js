import {UP, DOWN} from '../constants/direction';

const provideUsageSimulator = elevator => {

	let unsubscribeElapsedTime;
	let spawnChance = 0.16;

	const enabled = () => {
		return !!unsubscribeElapsedTime;
	}

	const toggle = () => {

		if (enabled()) {
			unsubscribeElapsedTime();
			unsubscribeElapsedTime = undefined;
			return;
		}

		unsubscribeElapsedTime = elevator.on.timeElapsed(elapseTime);

	};

	const spawn = () => {
		const randomInteger = (min, max) => {
			const spread = max - min + 1;
			return Math.floor(spread * Math.random()) + min;
		}

		const entering = 0;
		const exiting = 1;
		const otherTravel = 2;

		let origin = 0;
		let destination = 0;

		switch (randomInteger(entering, otherTravel)) {
			case entering:
				origin = elevator.floors[0];
				break;

			case exiting:
				destination = elevator.floors[0];
				break;
		}

		if (!origin) {
			origin = randomInteger(
				elevator.floors()[0], 
				elevator.floors().slice(-1)
			);
		}

		if (!destination) {
			destination = randomInteger(
				elevator.floors()[0], 
				elevator.floors().slice(-1)
			);
		}

		if (origin === destination) return;

		const direction = origin < destination ? UP : DOWN;

		let destinationEntered = false;

		const cancelListener = elevator.on.doorsOpen((floor, elevatorDirection, canChangeDirection) => {
			if (!destinationEntered && floor === origin) {
				if (canChangeDirection || elevatorDirection === direction) {
					elevator.addDestination(destination);		
					destinationEntered = true;
					return;
				}
			}

			if (destinationEntered && floor === destination) {
				elevator.allowDoorsToClose();
				cancelListener();
			}
		});

		elevator.requestElevator(origin, direction);
		
	}

	const elapseTime = () => {

		if (Math.random() < spawnChance) {
			spawn();
		}

	};

	return {
		toggle,
		spawn,
		enabled,
	};

}

export default provideUsageSimulator;