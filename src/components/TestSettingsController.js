import React from 'react';
import cx from 'classnames';
import useForceUpdate from '../hooks/useForceUpdate';


const TestSettingsController = ({usageSimulator, elevator}) => {

	const forceUpdate = useForceUpdate();

	return (
		<div className='row'>
			<button 
				onClick={() => {
					usageSimulator.spawn();
				}}
				children='Random passenger'/>
			<button 
				className={cx(usageSimulator.enabled() && 'toggled')}
				onClick={() => {
					usageSimulator.toggle();
					forceUpdate();
				}}
				children='Simulate usage'/>

			<button 
				onClick={() => {
					elevator.reset();
				}}
				children='x'/>
		</div>
	);
};

export default TestSettingsController;