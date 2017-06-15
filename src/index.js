/**
 * react-all-status
 *
 * Copyright © 2016 Tooraj Khatibi. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { bool, func } from 'prop-types';
import { connect } from 'react-redux';

const createState = (stateName, initialState = {}) => {
  /**
   * ============================================================================
   * Actions
   * ============================================================================
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
   * ============================================================================
   * Selectors
   * ============================================================================
   */
  const isActive = (state = initialState, flag) => !!state[flag];
  const isDeactive = (state = initialState, flag) => !isActive(state, flag);

  /**
   * ============================================================================
   * Reducer
   * ============================================================================
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
   * ============================================================================
   * Higer-order Component (HOC)
   * ============================================================================
   */
  const createHoC = (flags) => (component) => {
    const mapStateToProps = (state) => {
      const props = {};
      flags.forEach((flag) => {
        props[`${flag}Value`] = isActive(state[stateName], flag);
      });
      return props;
    };
    const mapDispatchToProps = (dispatch) => {
      const props = {};
      flags.forEach((flag) => {
        props[`${flag}Handler`] = () => dispatch(toggle(flag));
      });
      return props;
    };
    return connect(mapStateToProps, mapDispatchToProps)(component);
  };

  /**
   * ============================================================================
   * Prop Types
   * ============================================================================
   */
  const createPropTypes = (
    flag,
    isValueRequired = false,
    isHandlerRequired = false
  ) => {
    const propTypes = {};
    propTypes[`${flag}Value`] = isValueRequired ? bool.isRequired : bool;
    propTypes[`${flag}Handler`] = isHandlerRequired ? func.isRequired : func;
    return propTypes;
  };

  return {
    TOGGLE, toggle,
    ACTIVATE, activate,
    DEACTIVATE, deactivate,
    isActive, isDeactive,
    reducer,
    createHoC,
    createPropTypes,
  };
};

export default createState;
