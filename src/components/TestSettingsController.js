import React from 'react';
import cx from 'classnames';
import Button from './Button';

const TestSettingsController = ({spawnPassenger, toggleUsageSimulator, reset, usageSimulatorIsEnabled}) => {

	return (
		<div className='row'>
			<Button 
				onClick={spawnPassenger}
				children='Random passenger'/>
			<Button 
				className={cx(usageSimulatorIsEnabled && 'toggled')}
				onClick={toggleUsageSimulator}
				children='Simulate usage'/>

			<Button 
				onClick={reset}
				children='x'/>
		</div>
	);
};

export default TestSettingsController;