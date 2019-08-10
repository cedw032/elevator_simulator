import provideDispatcher from '../utils/dispatcher';

//////////////// CONSTANTS
import {UP, DOWN} from '../constants/direction';
import {STOPPED, OPEN, MOVING} from '../constants/elevatorState';
import ELEVATOR_EVENTS from '../constants/elevatorEvents';
//////////////// CONSTANTS // END

const provideElevator = (floorCount) => {

	//////////////// INTERNAL STATE
	let elevatorState = STOPPED;
	let currentFloor = 1;
	let currentDirection = UP;
	let destinations = [];
	let requests = [];
	let timestepsBetweenFloors = 0;
	let openTimeout = 0;
	let moveTime = 0;
	let openTime = 0;
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

	const cannotAcceptRequest = (floor, direction) => {
		return isOpenAtFloor(floor) 
			&& (canChangeDirection() || currentDirection === direction);
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
	const isOpenAtFloor = floor => floor == currentFloor && isOpen();

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
		dispatch.reset(
			currentFloor, 
			[...destinations], 
			[...requests], 
			isOpen(),
		);
	};

	const addDestination = floor => {

		if (isOpenAtFloor(floor)) {
			openTime = 0;
			return;
		}

		destinations.push(floor);
		if (elevatorState === OPEN) allowDoorsToClose();
		dispatch.destinationsChange([...destinations]);
	};

	const requestElevator = (floor, direction) => {
		
		if (cannotAcceptRequest(floor, direction)) {
			openTime = 0;
			return;	
		}

		requests.push({floor, direction});
		dispatch.requestsChange([...requests]);
	}

	const moveToNextFloor = () => {
		moveTime = 0;
		elevatorState = MOVING;
	};

	const closeDoors = () => {
		elevatorState = STOPPED;
		dispatch.doorsChange(isOpen());
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
		dispatch.doorsChange(isOpen());
		dispatch.destinationsChange([...destinations]);
		dispatch.requestsChange([...requests]);
	};

	const updateCurrentFloor = () => {
		currentFloor += currentDirection;
		dispatch.floorChanges(currentFloor);
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

	const setOpenTimeout = (value) => {
		openTimeout = value;
	}

	const passTime = () => {
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

			default: throw `unhandled elevator state ${elevatorState}`;
		}

		dispatch.timePasses();
	};

	///////////////// DISPATCHER
	const {dispatch, on} = provideDispatcher(ELEVATOR_EVENTS);
	///////////////// DISPATCHER // END

	///////////////// PUBLIC INTERFACE
	return {
		addDestination,
		requestElevator,
		passTime,
		setOpenTimeout,
		allowDoorsToClose,
		reset,
		on,
	};
	///////////////// PUBLIC INTERFACE // END

}

export default provideElevator;