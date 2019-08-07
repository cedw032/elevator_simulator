import {UP, DOWN} from '../constants/direction';

const provideUsageSimulator = elevator => {

	let unsubscribeTimeElapsed;
	let spawnChance = 0.16;

	const enabled = () => {
		return !!unsubscribeTimeElapsed;
	}

	const toggle = () => {

		if (enabled()) {
			unsubscribeTimeElapsed();
			unsubscribeTimeElapsed = undefined;
			return;
		}

		unsubscribeTimeElapsed = elevator.on.timeElapsed(elapseTime);

	};

	const spawn = () => {
		
		const randomInteger = (min, max) => 
			Math.round((max - min) * Math.random()) + min;

		const randomFloor = () => randomInteger(
			elevator.floors()[0], 
			+elevator.floors().slice(-1)
		);

		const entering = 1;
		const exiting = -1;

		let origin = 0;
		let destination = 0;

		switch (randomInteger(entering, exiting)) {
			case entering:
				origin = elevator.floors()[0];
				destination = randomFloor();
				break;

			case exiting:
				origin = randomFloor();
				destination = elevator.floors()[0];
				break;

			default:
				origin = randomFloor();
				destination = randomFloor();
				break;
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