import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createState from 'react-all-status';

// Use createState closure to configure state
const { reducer: themeReducer, createHoC } = createState('theme');

// Configure store
const store = createStore(combineReducers({ theme: themeReducer }));

// Create a simple component
const Sample = ({ themeTestButtonValue, themeTestButtonToggle }) => (
  <div>
    <Button onClick={themeTestButtonToggle}>
      Toggle
    </Button>
    <p style={{ backgroundColor: themeTestButtonValue ? 'yellow' : 'orange' }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum voluptatem
      modi neque quisquam earum,officia sed sequi pariatur, veniam voluptatibus!
      Sapiente nihil cupiditate perspiciatis sed rerum totam ipsum voluptatum at.
    </p>
  </div>
);

/**
 * Create container
 *
 * You can use an easier statement:
 * @example const SampleContainer = createHoC(['testButton'])(Sample);
 */
const createSampleContainer = createHoC(['testButton']);
const SampleContainer = createSampleContainer(Sample);

// Render your app
const App = () => (
  <Provider store={store}>
    <SampleContainer />
  </Provider>
);
render(<App />, document.getElementById('root'));
