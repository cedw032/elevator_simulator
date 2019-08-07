import React from 'react';
import cx from 'classnames';
import {DOWN, UP} from '../constants/direction';

const FloorDisplay = ({floor, floors, isCurrentFloor, elevatorDoorsOpen, requests, requestElevator}) => {

	const isUpRequested = !!requests.find(request => request.direction === UP);
	const isDownRequested = !!requests.find(request => request.direction === DOWN);

	const isTopFloor = floor === +floors.slice(-1);
	const isBottomFloor = floor === floors[0];

	return (
		<div className={cx('row', 'floor-display', isCurrentFloor && 'highlight')}>
			
			<div>Floor {floor}</div>
			
			<button 
				className={cx(isDownRequested && 'toggled')}
				onClick={() => requestElevator(floor, DOWN)}
				disabled={isBottomFloor}
				children='Down'/>
			
			<button 
				className={cx(isUpRequested && 'toggled')}
				onClick={() => requestElevator(floor, UP)}
				disabled={isTopFloor}
				children='Up'/>

			<div 
				className={cx(elevatorDoorsOpen && isCurrentFloor 
					? 'highlight2' 
					: 'hidden'
				)}
				children='Open'/>

		</div>
	);
};

export default FloorDisplay;