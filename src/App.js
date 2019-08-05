import React from 'react';
import './App.css';
import provideElevator from './models/elevator';
import FloorDisplay from './components/FloorDisplay';

const elevator = provideElevator(10);

function App() {

	console.log('ELE', elevator);

	return (
		<div className='app'>
			<button 
				children='|>'
				onClick={elevator.elapseTime}/>

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
