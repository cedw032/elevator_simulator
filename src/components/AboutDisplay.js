import React from 'react';

const AboutDisplay = () => {
	return (
		<div className='panel'>
			<h4>A brief explanation of the UI</h4>

			<div className='panel'>
				<h3>Top bar</h3>
				<p>From left to right</p>
				<p>
					<b>Step by step mode: </b> Clicking this button will enter step by step mode.
					This means the elevator will only run one cycle of its state machine with each 
					click on this button.  This can be useful for watching what the elevator does 
					under certain circumstances.
				</p>

				<p>
					<b>Play/Fast Forward: </b> This button will exit step by step mode, and subsequent 
					clicks will cycle between fast and regular play speeds.
				</p>

				<p>
					<b>Random Passenger: </b> When you want to add a passenger to the simulation pushing 
					this button will do so.
				</p>

				<p>
					<b>Simulate usage: </b> This will periodically add random passengers to the simulation
					at random intervals.  Handy for seeing how the elevator will behave under normal circumstances.
					Clicking again will disable this feature.
				</p>

				<p>
					<b>Reset: </b> If you want to put the elevator back into its initial state click this button.
					This is useful when you want to run specific test.  This button will not reset the play settings
					so you may want to make sure you enter step by step mode, and disabled usage simulation before
					resetting.
				</p>
			</div>

			<div className='panel'>
				<h3>Left section</h3>
				<p>
					This section is broken up into floors.
					Pressing any up or down button will summon the elevator to that floor.
					When a floor is highlighted it means the elevator is at the floor.
					You will also see the word open when the elevator doors are open on that floor.
				</p>
			</div>

			<div className='panel'>
				<h3>Right section</h3>
				<p>
					This represents the options available to a passenger inside the elevator.
					Pressing any of the numbered buttons will inform the elevator that you want
					to travel to that level.
				</p>
			</div>
		</div>
	);
}

export default AboutDisplay;