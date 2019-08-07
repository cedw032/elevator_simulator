import React from 'react';
import cx from 'classnames';

const ElevatorDisplay = ({floors, destinations, addDestination}) => {

	const isDestination = floor => 
		!!destinations.find(destination => destination === floor);

	return (
		<div className='elevator-display'>
			{floors.map((floor) =>
				<button
					children={floor}
					key={floor}
					className={
						cx(isDestination(floor) && 'toggled')
					}
					onClick={() => addDestination(floor)}/>
			)}
		</div>
	);
};

export default ElevatorDisplay;