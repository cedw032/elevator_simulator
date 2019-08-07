import provideDispatcher from '../utils/dispatcher';

//////////////// CONSTANTS
import {UP, DOWN} from '../constants/direction';
import {STOPPED, OPEN, MOVING} from '../constants/elevatorState';
import ELEVATOR_EVENTS from '../constants/elevatorEvents';
//////////////// CONSTANTS // END

const provideElevator = (floorCount) => {

	//////////////// INTERNAL STATE
	let elevatorState = STOPPED;
	let openTime = 0;
	let moveTime = 0;
	let currentFloor = 1;
	let currentDirection = UP;
	let destinations = [];
	let requests = [];

	let openTimeout = 0;
	let timestepsBetweenFloors = 0;

	const floors = [];
	for (let i = 1; i <= floorCount; ++i) floors.push(i);
	///////////////// INTERNAL STATE // END

	///////////////// INTERNAL DERIVED STATE
	const hasFloorToMoveTo = () => {
		return !!(destinations.length + requests.length);
	};

	const canChangeDirection = () => {

		const filterFloorsAhead = floor => floor * currentDirection > currentFloor * currentDirection;

		const destinationsAhead = destinations.filter(filterFloorsAhead);

		const requestFloorsAhead = requests.map(
			request => request.floor
		).filter(filterFloorsAhead);

		return !(requestFloorsAhead.length + destinationsAhead.length);
	};

	const shouldOpen = () => {
		
		if (destinationsAtCurrentFloor().length) return true;

		if (requestsAtCurrentFloor().length) {
			if (canChangeDirection()) return true;
			if (requestsAlsoMatchingCurrentDirection().length) return true;
		}

		return false;

	};

	const destinationsAtCurrentFloor = () => destinations.filter(
		destination => destination === currentFloor
	);

	const requestsAtCurrentFloor = () => requests.filter(
		request => request.floor === currentFloor
	);

	const requestsAlsoMatchingCurrentDirection =  () => requestsAtCurrentFloor().filter(
		request => request.direction === currentDirection
	);

	const isOpen = () => elevatorState === OPEN;

	///////////////// INTERNAL DERIVED STATE // END


	///////////////// ACTIONS
	const reset = () => {
		elevatorState = STOPPED;
		openTime = 0;
		moveTime = 0;
		currentFloor = 1;
		currentDirection = UP;
		destinations = [];
		requests = [];
	}

	const addDestination = floor => {
		destinations.push(floor);
		if (elevatorState === OPEN) allowDoorsToClose();
		dispatch.destinationAdded();
	};

	const requestElevator = (floor, direction) => {
		requests.push({floor, direction});
		dispatch.elevatorRequested();
	}

	const moveToNextFloor = () => {
		moveTime = 0;
		elevatorState = MOVING;
	};

	const closeDoors = () => {
		elevatorState = STOPPED;
		dispatch.doorsClose();
	};

	const stopElevator = () => elevatorState = STOPPED;

	const openDoors = () => {
		openTime = 0;

		destinations = destinations.filter(
			destination => destination !== currentFloor
		);

		const requestFilter = canChangeDirection()
			? request => request.floor !== currentFloor
			: request => request.floor !== currentFloor || request.direction !== currentDirection;

		requests = requests.filter(requestFilter);

		elevatorState = OPEN;
		dispatch.doorsOpen(currentFloor, currentDirection, canChangeDirection());
	};

	const updateCurrentFloor = () => {
		currentFloor += currentDirection;
		dispatch.floorChange();
	};

	const updateCurrentDirection = () => {
		if (canChangeDirection()) {
			currentDirection *= DOWN;
		}
	};

	const canDoorsClose = () => {
		return openTime >= openTimeout;
	};

	const allowDoorsToClose = () => {
		if (isOpen()) {
			openTime = openTimeout;
		}
	};

	const elapseTime = () => {
		switch (elevatorState) {
			case STOPPED:
				if (shouldOpen()) {
					openDoors();
					break;
				}

				if (hasFloorToMoveTo()) {
					updateCurrentDirection();
					moveToNextFloor();
					break;
				}
				break;

			case OPEN:
				if (canDoorsClose()) {
					closeDoors();
					break;
				}
				++openTime;
				break;

			case MOVING:
				if (moveTime >= timestepsBetweenFloors) {
					updateCurrentFloor();

					if (shouldOpen()) {
						stopElevator();
						break;
					}

					moveToNextFloor();
					break;
				}

				++moveTime;
				break;
		}

		dispatch.timeElapsed();
	};

	///////////////// DISPATCHER
	const {dispatch, on} = provideDispatcher(ELEVATOR_EVENTS);
	///////////////// DISPATCHER // END

	///////////////// PUBLIC INTERFACE
	return {
		addDestination,
		requestElevator,
		elapseTime,
		allowDoorsToClose,

		setOpenTimeout: value => openTimeout = value,

		currentFloor: () => currentFloor,
		floors: () => [...floors],
		isOpen,

		isDestination: floor => destinations.filter(
			destination => destination === floor
		).length !== 0,

		isRequested: (floor, direction) => requests.filter(
			request => request.floor === floor && request.direction === direction
		).length !== 0,

		on,
	};
	///////////////// PUBLIC INTERFACE // END

}

export default provideElevator;