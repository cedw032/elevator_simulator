import React, {useState} from 'react';
import './App.css';
import provideElevator from './models/elevator';
import FloorDisplay from './components/FloorDisplay';
import TimeController from './components/TimeController'

const FLOOR_COUNT = 10;

const elevator = provideElevator(FLOOR_COUNT);

function App() {

	return (
		<div className='app'>
			
			<TimeController elevator={elevator}/>

			<div className='floor-bank'>
				{elevator.floors().map(floor =>
					<FloorDisplay 
						floor={floor}
						elevator={elevator}
						key={floor}/>
				)}
			</div>
		</div>
	);
}

export default App;
