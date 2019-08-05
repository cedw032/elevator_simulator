import React, {useState} from 'react';
import './App.css';
import provideElevator from './models/elevator';
import TimeController from './components/TimeController'
import FloorDisplay from './components/FloorDisplay';
import ElevatorDisplay from './components/ElevatorDisplay';

const FLOOR_COUNT = 10;

const elevator = provideElevator(FLOOR_COUNT);

function App() {

	return (
		<div className='app'>
			
			<TimeController elevator={elevator}/>

			<div className='row'>
				<div className='floor-bank'>
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
