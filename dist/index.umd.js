(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('babel-runtime/helpers/extends'), require('prop-types'), require('react-redux')) :
  typeof define === 'function' && define.amd ? define(['babel-runtime/helpers/extends', 'prop-types', 'react-redux'], factory) :
  (global.react-all-status = factory(global._extends,global.propTypes,global.reactRedux));
}(this, function (_extends,propTypes,reactRedux) { 'use strict';

  _extends = 'default' in _extends ? _extends['default'] : _extends;

  var createState = function createState(stateName) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    /**
     * ===========================================================================
     * Selectors
     * ===========================================================================
     */
    var isActive = function isActive(state, flag) {
      return !!state[stateName][flag];
    };

    /**
     * ===========================================================================
     * Actions
     * ===========================================================================
     */
    var TOGGLE = 'TOGGLE';
    var toggle = function toggle(flag) {
      return {
        type: TOGGLE,
        stateName: stateName,
        flag: flag
      };
    };
    var ACTIVATE = 'ACTIVATE';
    var activate = function activate(flag) {
      return {
        type: ACTIVATE,
        stateName: stateName,
        flag: flag
      };
    };
    var DEACTIVATE = 'DEACTIVATE';
    var deactivate = function deactivate(flag) {
      return {
        type: DEACTIVATE,
        stateName: stateName,
        flag: flag
      };
    };

    /**
     * ===========================================================================
     * Reducer
     * ===========================================================================
     */
    var reducer = function reducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments[1];

      if (stateName !== action.stateName) {
        return state;
      }
      switch (action.type) {
        case TOGGLE:
          {
            var newState = _extends({}, state);
            newState[action.flag] = !state[action.flag];
            return newState;
          }
        case ACTIVATE:
          {
            var _newState = _extends({}, state);
            _newState[action.flag] = true;
            return _newState;
          }
        case DEACTIVATE:
          {
            var _newState2 = _extends({}, state);
            _newState2[action.flag] = false;
            return _newState2;
          }
        default:
          {
            return state;
          }
      }
    };

    /**
     * ===========================================================================
     * Prop Names
     * ===========================================================================
     */
    var capitalize = function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    var createValuePropName = function createValuePropName(flag) {
      return '' + stateName + capitalize(flag) + 'Value';
    };
    var createTogglePropName = function createTogglePropName(flag) {
      return '' + stateName + capitalize(flag) + 'Toggle';
    };
    var createActivatePropName = function createActivatePropName(flag) {
      return '' + stateName + capitalize(flag) + 'Activate';
    };
    var createDeactivatePropName = function createDeactivatePropName(flag) {
      return '' + stateName + capitalize(flag) + 'Deactivate';
    };
    var createPropNames = function createPropNames(flag) {
      return {
        value: createValuePropName(flag),
        toggle: createTogglePropName(flag),
        activate: createActivatePropName(flag),
        deactivate: createDeactivatePropName(flag)
      };
    };

    /**
     * ===========================================================================
     * Higer-order Component (HOC)
     * ===========================================================================
     */
    var createHoC = function createHoC(flags) {
      return function (component) {
        var mapStateToProps = function mapStateToProps(state) {
          var props = {};
          flags.forEach(function (flag) {
            props[createValuePropName(flag)] = isActive(state, flag);
          });
          return props;
        };
        var mapDispatchToProps = function mapDispatchToProps(dispatch) {
          var props = {};
          flags.forEach(function (flag) {
            props[createTogglePropName(flag)] = function () {
              return dispatch(toggle(flag));
            };
            props[createActivatePropName(flag)] = function () {
              return dispatch(activate(flag));
            };
            props[createDeactivatePropName(flag)] = function () {
              return dispatch(deactivate(flag));
            };
          });
          return props;
        };
        return reactRedux.connect(mapStateToProps, mapDispatchToProps)(component);
      };
    };

    /**
     * ===========================================================================
     * Prop Types
     * ===========================================================================
     */
    var createPropTypes = function createPropTypes(flag) {
      var requiredProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var propTypes$$ = {};
      var valueName = createValuePropName(flag);
      var toggleName = createTogglePropName(flag);
      var activateName = createActivatePropName(flag);
      var deactivateName = createDeactivatePropName(flag);
      propTypes$$[valueName] = requiredProps.indexOf(valueName) !== -1 ? propTypes.bool.isRequired : propTypes.bool;
      propTypes$$[toggleName] = requiredProps.indexOf(toggleName) !== -1 ? propTypes.func.isRequired : propTypes.func;
      propTypes$$[activateName] = requiredProps.indexOf(activateName) !== -1 ? propTypes.func.isRequired : propTypes.func;
      propTypes$$[deactivateName] = requiredProps.indexOf(deactivateName) !== -1 ? propTypes.func.isRequired : propTypes.func;
      return propTypes$$;
    };

    return {
      TOGGLE: TOGGLE,
      ACTIVATE: ACTIVATE,
      DEACTIVATE: DEACTIVATE,
      toggle: toggle,
      activate: activate,
      deactivate: deactivate,
      isActive: isActive,
      reducer: reducer,
      createPropNames: createPropNames,
      createValuePropName: createValuePropName,
      createTogglePropName: createTogglePropName,
      createActivatePropName: createActivatePropName,
      createDeactivatePropName: createDeactivatePropName,
      createHoC: createHoC,
      createPropTypes: createPropTypes
    };
  };

  return createState;

}));
//# sourceMappingURL=index.umd.js.map