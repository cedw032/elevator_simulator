import React from 'react';
import cx from 'classnames';
import {DOWN, UP} from '../constants/direction';
import Button from './Button';

const FloorDisplay = ({floor, floors, isCurrentFloor, elevatorDoorsOpen, requests, requestElevator}) => {

	const isUpRequested = !!requests.find(request => request.direction === UP);
	const isDownRequested = !!requests.find(request => request.direction === DOWN);

	const hereAndOpen = isCurrentFloor && elevatorDoorsOpen;
	const hereAndNotOpen = isCurrentFloor && !elevatorDoorsOpen;

	const isTopFloor = floor === +floors.slice(-1);
	const isBottomFloor = floor === floors[0];

	return (
		<div className={cx('row', 'floor-display', isCurrentFloor && 'highlight')}>
			
			<div>Floor {floor}</div>
			
			<Button 
				className={cx(isDownRequested && 'toggled')}
				onClick={() => requestElevator(floor, DOWN)}
				disabled={isBottomFloor}
				children='Down'/>
			
			<Button 
				className={cx(isUpRequested && 'toggled')}
				onClick={() => requestElevator(floor, UP)}
				disabled={isTopFloor}
				children='Up'/>

			<div
				className={cx(
					'floor-door-state',
					hereAndNotOpen && 'yellow',
					hereAndOpen && 'white',
					!isCurrentFloor && 'hidden' 
				)}
				children={hereAndOpen ? '|__|' : '_||_' }/>

		</div>
	);
};

export default FloorDisplay;