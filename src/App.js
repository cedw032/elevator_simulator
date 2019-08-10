import React, {useState, useEffect} from 'react';
import cx from 'classnames';
import './App.css';

import provideClock from './models/clock';
import provideElevator from './models/elevator';
import provideUsageSimulator from './models/usageSimulator';

import TimeController from './components/TimeController'
import TestSettingsController from './components/TestSettingsController'
import FloorBank from './components/FloorBank';
import ElevatorDisplay from './components/ElevatorDisplay';
import AboutDisplay from './components/AboutDisplay';

const FLOOR_COUNT = 10;

const clock = provideClock();
const elevator = provideElevator(FLOOR_COUNT);

const floors = [];
for (let i = 1; i <= FLOOR_COUNT; ++i) floors.push(i);

const usageSimulator = provideUsageSimulator(elevator, floors);;

function App() {

	const [paused, setPaused] = useState(false);


	const [currentFloor, setCurrentFloor] = useState(0);
	const [destinations, setDestinations] = useState([]);
	const [requests, setRequests] = useState([]);
	const [doorsOpen, setDoorsOpen] = useState(false);
	const [usageSimulatorIsEnabled, setusageSimulatorIsEnabled] = useState(false);
	const [quickAnimations, setQuickAnimations] = useState(false);

	useEffect(() => {

		const cancellers = [];

		cancellers.push(clock.on.timePasses(elevator.passTime));

		cancellers.push(clock.on.pausedChanges(setPaused));

		cancellers.push(elevator.on.floorChanges(setCurrentFloor));
		cancellers.push(elevator.on.destinationsChange(setDestinations));
		cancellers.push(elevator.on.requestsChange(setRequests));
		cancellers.push(elevator.on.doorsChange(setDoorsOpen));

		cancellers.push(
			elevator.on.reset((currentFloor, destinations, requests, doorsOpen) => {
				setCurrentFloor(currentFloor);
				setDestinations(destinations);
				setRequests(requests);
				setDoorsOpen(doorsOpen);
			})
		);

		cancellers.push(usageSimulator.on.toggle(setusageSimulatorIsEnabled));

		elevator.reset();
		usageSimulator.toggle();
		clock.play();

		return () => cancellers.forEach(canceller => canceller())

	},[]);

	const {
		play,
		pause,
		passTime,
		setPlayInterval,
	} = clock;

	const {
		addDestination,
		requestElevator,
		reset,
		setOpenTimeout
	} = elevator;

	const {
		spawn: spawnPassenger,
		toggle: toggleUsageSimulator,
	} = usageSimulator;

	return (
		<div className={cx('app', quickAnimations && 'quick-animations')}>
			
			<div className='panel row top-bar'>
				<TimeController 
					passTime={passTime}
					paused={paused}
					play={play}
					pause={pause}
					setPlayInterval={setPlayInterval}
					setOpenTimeout={setOpenTimeout}
					setQuickAnimations={setQuickAnimations}/>
				<TestSettingsController 
					spawnPassenger={spawnPassenger}
					toggleUsageSimulator={toggleUsageSimulator}
					reset={reset}
					usageSimulatorIsEnabled={usageSimulatorIsEnabled}
					elevator={elevator}/>
			</div>

			<div className='row'>
				<FloorBank
					floors={floors}
					currentFloor={currentFloor}
					requests={requests}
					doorsOpen={doorsOpen}
					requestElevator={requestElevator}/>
				<ElevatorDisplay 
					floors={floors}
					destinations={destinations}
					addDestination={addDestination}/>
			</div>
			<AboutDisplay/>
		</div>
	);
}

export default App;
