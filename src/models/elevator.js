//////////////// CONSTANTS
import {UP, DOWN, NONE} from '../constants/direction';
import {STOPPED, OPEN, MOVING} from '../constants/elevatorState';
//////////////// CONSTANTS // END

const provideElevator = (floorCount) => {

	//////////////// INTERNAL STATE
	let elevatorState = STOPPED;
	let openTime = 0;
	let moveTime = 0;
	let currentFloor = 1;
	let destinations = [];
	let requests = [];

	const floors = [];
	for (let i = 1; i <= floorCount; ++i) floors.push(i);
	///////////////// INTERNAL STATE // END

	///////////////// INTERNAL DERIVED STATE
	const floorToMoveTo = () => {
		if (destinations.length) return destinations[0];
		if (requests.length) return requests[0].floor;
		return undefined;
	};

	const shouldOpen = () => {
		
		if (destinationsAtCurrentFloor().length) return true;

		if (requestsAtCurrentFloor().length) {
			if (currentDirection() == NONE) return true;
			if (requestsAlsoMatchingCurrentDirection().length) return true;
		}

		return false;

	};

	const destinationsAtCurrentFloor = () => destinations.filter(
		destination => destination == currentFloor
	);

	const requestsAtCurrentFloor = () => requests.filter(
		request => request.floor == currentFloor
	);

	const requestsAlsoMatchingCurrentDirection =  () => requestsAtCurrentFloor().filter(
		request => request.direction == currentDirection()
	);

	const currentDirection = () => {
		if (floorToMoveTo() > currentFloor) return UP;
		if (floorToMoveTo() < currentFloor) return DOWN;
		return NONE;
	};
	///////////////// INTERNAL DERIVED STATE // END


	///////////////// ACTIONS
	const addDestination = floor => {
		destinations.push(floor);
		if (elevatorState == OPEN) closeDoors();
	};

	const requestElevator = (floor, direction) => requests.push({floor, direction})

	const moveToNextFloor = () => {
		moveTime = 0;
		elevatorState = MOVING;
	};

	const closeDoors = () => {
		elevatorState = STOPPED;
		dispatchDoorsClose();
	};

	const stopElevator = () => elevatorState = STOPPED;

	const openDoors = () => {
		openTime = 0;

		destinations = destinations.filter(
			destination => destination != currentFloor
		);

		requests = requests.filter(
			request => request.floor != currentFloor
		);

		elevatorState = OPEN;
		dispatchDoorsOpen();
	};

	const updateCurrentFloor = () => {
		if (currentDirection() == UP) {
			++currentFloor;
			dispatchFloorChange();
			return;
		}

		if (currentDirection() == DOWN) {
			--currentFloor;
			dispatchFloorChange();
			return;
		}
	};

	const elapseTime = () => {
		switch (elevatorState) {
			case STOPPED:
				if (shouldOpen()) {
					openDoors();
					return;
				}

				if (floorToMoveTo()) {
					moveToNextFloor();
					return;
				}
				return;

			case OPEN:
				if (openTime) {
					closeDoors();
					return;
				}
				++openTime;
				return;

			case MOVING:
				if (moveTime) {
					updateCurrentFloor();

					if (shouldOpen()) {
						stopElevator();
						return;
					}

					moveToNextFloor();
					return;
				}

				++moveTime;
				return;
		}
	};

	///////////////// LISTENERS
	const floorChangeListeners = [];
	const doorsOpenListeners = [];
	const doorsCloseListeners = [];
	///////////////// LISTENERS // END

	///////////////// DISPATCHERS
	const dispatchFloorChange = () => {
		floorChangeListeners.forEach(listener => listener());
	};

	const dispatchDoorsOpen = () => {
		doorsOpenListeners.forEach(listener => listener());
	};

	const dispatchDoorsClose = () => {
		doorsCloseListeners.forEach(listener => listener());
	};
	///////////////// DISPATCHERS // END

	///////////////// PUBLIC INTERFACE
	return {
		addDestination,
		requestElevator,
		elapseTime,

		currentFloor: () => currentFloor,
		floors: () => [...floors],
		isOpen: () => elevatorState == OPEN,

		isDestination: floor => destinations.filter(
			destination => destination == floor
		).length != 0,

		isRequested: (floor, direction) => requests.filter(
			request => request.floor == floor && request.direction == direction
		).length != 0,

		onFloorChange: listener => floorChangeListeners.push(listener),
		onDoorsOpen: listener => doorsOpenListeners.push(listener),
		onDoorsClose: listener => doorsCloseListeners.push(listener),

	};
	///////////////// PUBLIC INTERFACE // END

}

export default provideElevator;