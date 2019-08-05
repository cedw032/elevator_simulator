import React, {useEffect} from 'react';
import cx from 'classnames';
import {DOWN, UP} from '../constants/direction';
import useForceUpdate from '../hooks/useForceUpdate';
import useForceUpdateOnEvents from '../hooks/useForceUpdateOnEvents';

const FloorDisplay = ({floor, elevator}) => {

	const forceUpdate = useForceUpdate();
	useForceUpdateOnEvents([
		elevator.onFloorChange,
		elevator.onDoorsOpen,
		elevator.onDoorsClose,
	]);

	const isDoorOpen = () => elevator.currentFloor() == floor && elevator.isOpen()

	const requestElevator = direction => () => {
		elevator.requestElevator(floor, direction);
		forceUpdate();
	}

	return (
		<div className='row'>
			<div className={cx(elevator.currentFloor() == floor && 'highlight')}>
				Floor {floor}
			</div>
			
			<button 
				className={cx(elevator.isRequested(floor, DOWN) && 'toggled')}
				onClick={requestElevator(DOWN)}
				children='Down'/>
			
			<button 
				className={cx(elevator.isRequested(floor, UP) && 'toggled')}
				onClick={requestElevator(UP)}
				children='Up'/>
			
			{isDoorOpen()
				? <div>Open</div>
				: <div>Closed</div>
			}
		</div>
	);
};

export default FloorDisplay;