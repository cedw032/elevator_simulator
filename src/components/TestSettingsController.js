import React from 'react';
import cx from 'classnames';
import useForceUpdate from '../hooks/useForceUpdate';


const TestSettingsController = ({usageSimulator}) => {

	const forceUpdate = useForceUpdate();

	return (
		<div className='row'>
			<button 
				onClick={() => {
					usageSimulator.spawn();
					forceUpdate();
				}}
				children='Random passenger'/>
			<button 
				className={cx(usageSimulator.enabled() && 'toggled')}
				onClick={() => {
					usageSimulator.toggle();
					forceUpdate();
				}}
				children='Simulate usage'/>
		</div>
	);
};

export default TestSettingsController;