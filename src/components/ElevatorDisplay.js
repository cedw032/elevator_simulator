import React, {useEffect} from 'react';
import cx from 'classnames';
import {DOWN, UP} from '../constants/direction';
import useForceUpdate from '../hooks/useForceUpdate';
import useForceUpdateOnEvents from '../hooks/useForceUpdateOnEvents';

const ElevatorDisplay = ({elevator}) => {

	const forceUpdate = useForceUpdate();
	useForceUpdateOnEvents([elevator.onDoorsOpen]);

	return (
		<div className='elevator-display'>
			{elevator.floors().map((floor) =>
				<button
					children={floor}
					key={floor}
					className={
						cx(elevator.isDestination(floor) && 'toggled')
					}
					onClick={() => {
						elevator.addDestination(floor);
						forceUpdate();
					}}/>
			)}
		</div>
	);
};

export default ElevatorDisplay;