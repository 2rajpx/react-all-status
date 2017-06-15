import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import createState from 'react-all-status';

// Use createState closure to configure state
const { reducer: themeReducer, createHoC, createPropTypes } = createState('theme');

// Configure store
const store = createStore(combineReducers({ theme: themeReducer }));

// Create a simple component
const buttonStatusId = 'buttonClick';
const Sample = ({ buttonClickValue, ButtonClickHandler }) => (
  <div>
    <Button onClick={ButtonClickHandler}>
      Toggle
    </Button>
    <p style={{ backgroundColor: buttonClickValue ? 'yellow' : 'orange' }}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum voluptatem
      modi neque quisquam earum,officia sed sequi pariatur, veniam voluptatibus!
      Sapiente nihil cupiditate perspiciatis sed rerum totam ipsum voluptatum at.
    </p>
  </div>
);
Sample.propTypes = {
  ...createPropTypes(buttonStatusId),
};

/**
 * Create container
 *
 * You can use easier statement:
 * @example const SampleContainer = createHoC([buttonStatusId])(Sample);
 */
const createSampleContainer = createHoC([buttonStatusId]);
const SampleContainer = createSampleContainer(Sample);

// Render
const App = () => (
  <Provider store={store}>
    <SampleContainer />
  </Provider>
);
render(<App />, document.getElementById('root'));
