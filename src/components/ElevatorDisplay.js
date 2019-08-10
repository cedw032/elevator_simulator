import React from 'react';
import cx from 'classnames';
import Button from './Button'

const ElevatorDisplay = ({floors, destinations, addDestination}) => {

	const isDestination = floor => 
		!!destinations.find(destination => destination === floor);

	return (
		<div className='elevator-display'>
			{floors.map((floor) =>
				<Button
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