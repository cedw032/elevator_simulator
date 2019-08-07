import React from 'react';
import cx from 'classnames';

const TestSettingsController = ({spawnPassenger, toggleUsageSimulator, reset, usageSimulatorIsEnabled}) => {

	return (
		<div className='row'>
			<button 
				onClick={spawnPassenger}
				children='Random passenger'/>
			<button 
				className={cx(usageSimulatorIsEnabled && 'toggled')}
				onClick={toggleUsageSimulator}
				children='Simulate usage'/>

			<button 
				onClick={reset}
				children='x'/>
		</div>
	);
};

export default TestSettingsController;