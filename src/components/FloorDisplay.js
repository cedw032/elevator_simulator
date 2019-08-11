import React from 'react';
import cx from 'classnames';
import {DOWN, UP} from '../constants/direction';
import Button from './Button';

const FloorDisplay = ({floor, floors, isCurrentFloor, elevatorDoorsOpen, requests, isDestination, requestElevator}) => {

	const isUpRequested = !!requests.find(request => request.direction === UP);
	const isDownRequested = !!requests.find(request => request.direction === DOWN);

	const hereAndOpen = isCurrentFloor && elevatorDoorsOpen;
	const hereAndNotOpen = isCurrentFloor && !elevatorDoorsOpen;

	const isTopFloor = floor === +floors.slice(-1);
	const isBottomFloor = floor === floors[0];

	const elevatorExpected = 
		!hereAndOpen 
		&& (isDestination || isUpRequested || isDownRequested);

	return (
		<div className={cx('row', 'floor-display', isCurrentFloor && 'highlight')}>
			
			<div
				children={`Floor ${floor}`} 
				className={cx(
					'floor-state', 
					elevatorExpected && 'yellow',
					hereAndOpen && 'white',
					!elevatorExpected && !hereAndOpen && 'hidden',
				)}/>
			
			<Button 
				children='Down'
				className={cx(isDownRequested && 'toggled')}
				onClick={() => requestElevator(floor, DOWN)}
				disabled={isBottomFloor}/>
			
			<Button 
				children='Up'
				className={cx(isUpRequested && 'toggled')}
				onClick={() => requestElevator(floor, UP)}
				disabled={isTopFloor}/>

			<div
				children={hereAndOpen ? '|__|' : '_||_' }
				className={cx(
					'floor-door-state',
					hereAndNotOpen && 'yellow',
					hereAndOpen && 'white',
					!isCurrentFloor && 'hidden' 
				)}/>

		</div>
	);
};

export default FloorDisplay;