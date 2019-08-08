## Run locally
To run locally, navigate to the directory you want to save the project and copy the following into your terminal.
```
git clone https://github.com/cedw032/elevator_simulator.git
cd elevator_simulator
yarn install
yarn start
```
If you don't have git and yarn installed, you will have to install those first

## Test
Once the project is installed, the tests can be run with the following
```
yarn test
```

The tests can be assessed in the file at `./src/App.test.js`

## Notes
All logic to do with the elevator is contained in the file `./src/models/elevator.js`.
The remainder of the source code provides a test app allowing you to see the elevator in action.
