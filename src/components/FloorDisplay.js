import React, {useEffect} from 'react';
import cx from 'classnames';
import {DOWN, UP} from '../constants/direction';
import useForceUpdateOnEvents from '../hooks/useForceUpdateOnEvents';

const FloorDisplay = ({floor, elevator}) => {

	useForceUpdateOnEvents([
		elevator.on.floorChange,
		elevator.on.doorsOpen,
		elevator.on.doorsClose,
		elevator.on.elevatorRequested,
	]);

	const isDoorOpen = () => elevator.currentFloor() == floor && elevator.isOpen()

	const isAtThisFloor = () => elevator.currentFloor() == floor;

	const isRequested = direction => elevator.isRequested(floor, direction)

	const requestElevator = direction => () => elevator.requestElevator(floor, direction);

	return (
		<div className={cx('row', 'floor-display', isAtThisFloor() && 'highlight')}>
			<div>
				Floor {floor}
			</div>
			
			<button 
				className={cx(isRequested(DOWN) && 'toggled')}
				onClick={requestElevator(DOWN)}
				children='Down'/>
			
			<button 
				className={cx(isRequested(UP) && 'toggled')}
				onClick={requestElevator(UP)}
				children='Up'/>
			
			{isDoorOpen()
				? <div className='highlight2'>Open</div>
				: <div></div>
			}
		</div>
	);
};

export default FloorDisplay;