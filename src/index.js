/**
 * react-all-status
 *
 * Copyright © 2017 Tooraj Khatibi. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { bool, func } from 'prop-types';
import { connect } from 'react-redux';

const createState = (stateName, initialState = {}) => {
  /**
   * ===========================================================================
   * Selectors
   * ===========================================================================
   */
  const isActive = (state, flag) => !!state[stateName][flag];

  /**
   * ===========================================================================
   * Actions
   * ===========================================================================
   */
  const TOGGLE = 'TOGGLE';
  const toggle = flag => ({
    type: TOGGLE,
    stateName,
    flag,
  });
  const ACTIVATE = 'ACTIVATE';
  const activate = flag => ({
    type: ACTIVATE,
    stateName,
    flag,
  });
  const DEACTIVATE = 'DEACTIVATE';
  const deactivate = flag => ({
    type: DEACTIVATE,
    stateName,
    flag,
  });

  /**
   * ===========================================================================
   * Reducer
   * ===========================================================================
   */
  const reducer = (state = initialState, action) => {
    if (stateName !== action.stateName) {
      return state;
    }
    switch (action.type) {
      case TOGGLE: {
        const newState = { ...state };
        newState[action.flag] = !state[action.flag];
        return newState;
      }
      case ACTIVATE: {
        const newState = { ...state };
        newState[action.flag] = true;
        return newState;
      }
      case DEACTIVATE: {
        const newState = { ...state };
        newState[action.flag] = false;
        return newState;
      }
      default: {
        return state;
      }
    }
  };

  /**
   * ===========================================================================
   * Prop Names
   * ===========================================================================
   */
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  const createValuePropName = (flag) => `${stateName}${capitalize(flag)}Value`;
  const createTogglePropName = (flag) => `${stateName}${capitalize(flag)}Toggle`;
  const createActivatePropName = (flag) => `${stateName}${capitalize(flag)}Activate`;
  const createDeactivatePropName = (flag) => `${stateName}${capitalize(flag)}Deactivate`;
  const createPropNames = (flag) => ({
    value: createValuePropName(flag),
    toggle: createTogglePropName(flag),
    activate: createActivatePropName(flag),
    deactivate: createDeactivatePropName(flag),
  });

  /**
   * ===========================================================================
   * Higer-order Component (HOC)
   * ===========================================================================
   */
  const createHoC = (flags) => (component) => {
    const mapStateToProps = (state) => {
      const props = {};
      flags.forEach((flag) => {
        props[createValuePropName(flag)] = isActive(state, flag);
      });
      return props;
    };
    const mapDispatchToProps = (dispatch) => {
      const props = {};
      flags.forEach((flag) => {
        props[createTogglePropName(flag)] = () => dispatch(toggle(flag));
        props[createActivatePropName(flag)] = () => dispatch(activate(flag));
        props[createDeactivatePropName(flag)] = () => dispatch(deactivate(flag));
      });
      return props;
    };
    return connect(mapStateToProps, mapDispatchToProps)(component);
  };

  /**
   * ===========================================================================
   * Prop Types
   * ===========================================================================
   */
  const createPropTypes = (flag, requiredProps = []) => {
    const propTypes = {};
    const valueName = createValuePropName(flag);
    const toggleName = createTogglePropName(flag);
    const activateName = createActivatePropName(flag);
    const deactivateName = createDeactivatePropName(flag);
    propTypes[valueName] = requiredProps.indexOf(valueName) !== -1
      ? bool.isRequired
      : bool;
    propTypes[toggleName] = requiredProps.indexOf(toggleName) !== -1
      ? func.isRequired
      : func;
    propTypes[activateName] = requiredProps.indexOf(activateName) !== -1
      ? func.isRequired
      : func;
    propTypes[deactivateName] = requiredProps.indexOf(deactivateName) !== -1
      ? func.isRequired
      : func;
    return propTypes;
  };

  return {
    TOGGLE,
    ACTIVATE,
    DEACTIVATE,
    toggle,
    activate,
    deactivate,
    isActive,
    reducer,
    createPropNames,
    createValuePropName,
    createTogglePropName,
    createActivatePropName,
    createDeactivatePropName,
    createHoC,
    createPropTypes,
  };
};

export default createState;
