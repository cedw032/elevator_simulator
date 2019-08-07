import React from 'react';
import cx from 'classnames';
import useForceUpdateOnEvents from '../hooks/useForceUpdateOnEvents';

const ElevatorDisplay = ({elevator}) => {

	useForceUpdateOnEvents([
		elevator.on.doorsOpen,
		elevator.on.destinationAdded,
	]);

	return (
		<div className='elevator-display'>
			{elevator.floors().map((floor) =>
				<button
					children={floor}
					key={floor}
					className={
						cx(elevator.isDestination(floor) && 'toggled')
					}
					onClick={() => elevator.addDestination(floor)}/>
			)}
		</div>
	);
};

export default ElevatorDisplay;