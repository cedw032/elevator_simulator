import React from 'react';
import FloorDisplay from './FloorDisplay';

const FloorBank = ({floors, currentFloor, requests, doorsOpen, requestElevator}) => {

	return (
		<div className='floor-bank panel'>
			{floors.map(floor =>
				<FloorDisplay 
					floor={floor}
					floors={floors}
					isCurrentFloor={floor === currentFloor}
					elevatorDoorsOpen={doorsOpen}
					requests={requests.filter(request => request.floor === floor)}
					requestElevator={requestElevator}
					key={floor}/>
			)}
		</div>
	);

}

export default FloorBank;