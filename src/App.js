import React, {useState, useEffect} from 'react';
import './App.css';

import provideElevator from './models/elevator';
import provideUsageSimulator from './models/usageSimulator';

import TimeController from './components/TimeController'
import TestSettingsController from './components/TestSettingsController'
import FloorBank from './components/FloorBank';
import ElevatorDisplay from './components/ElevatorDisplay';
import AboutDisplay from './components/AboutDisplay';

const FLOOR_COUNT = 10;

const elevator = provideElevator(FLOOR_COUNT);

const floors = [];
for (let i = 1; i <= FLOOR_COUNT; ++i) floors.push(i);

const usageSimulator = provideUsageSimulator(elevator, floors);

function App() {

	const [currentFloor, setCurrentFloor] = useState(0);
	const [destinations, setDestinations] = useState([]);
	const [requests, setRequests] = useState([]);
	const [doorsOpen, setDoorsOpen] = useState(false);
	const [usageSimulatorIsEnabled, setusageSimulatorIsEnabled] = useState(false);

	useEffect(() => {

		const cancellers = [];

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

		return () => cancellers.forEach(canceller => canceller())

	},[]);

	const {
		addDestination,
		requestElevator,
		reset,
		passTime,
		setOpenTimeout
	} = elevator;

	const {
		spawn: spawnPassenger,
		toggle: toggleUsageSimulator,
	} = usageSimulator;

	return (
		<div className='app'>
			
			<div className='panel row top-bar'>
				<TimeController 
					passTime={passTime}
					setOpenTimeout={setOpenTimeout}/>
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
