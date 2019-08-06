import React, {useState} from 'react';
import './App.css';

import provideElevator from './models/elevator';
import provideUsageSimulator from './models/usageSimulator';

import TimeController from './components/TimeController'
import TestSettingsController from './components/TestSettingsController'
import FloorDisplay from './components/FloorDisplay';
import ElevatorDisplay from './components/ElevatorDisplay';

const FLOOR_COUNT = 10;

const elevator = provideElevator(FLOOR_COUNT);
const usageSimulator = provideUsageSimulator(elevator);

function App() {

	return (
		<div className='app'>
			
			<div className='panel row top-bar'>
				<TimeController elevator={elevator}/>
				<TestSettingsController usageSimulator={usageSimulator}/>
			</div>

			<div className='row'>
				<div className='floor-bank panel'>
					{elevator.floors().map(floor =>
						<FloorDisplay 
							floor={floor}
							elevator={elevator}
							key={floor}/>
					)}
				</div>
				<ElevatorDisplay elevator={elevator}/>
			</div>
		</div>
	);
}

export default App;
