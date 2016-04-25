'use strict';

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React;

var coalesceNonElementChildren = require('./coalesceNonElementChildren');

var systemButtonOpacity = 0.2;

var Button = React.createClass({
  propTypes: {
    ...TouchableOpacity.propTypes,
    containerStyle: View.propTypes.style,
    containerDisabledStyle: View.propTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
  },
  
  render() {
    var touchableProps = {
      activeOpacity: this._computeActiveOpacity(),
    };
    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress;
      touchableProps.onPressIn = this.props.onPressIn;
      touchableProps.onPressOut = this.props.onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
    }
    var {disabled} = this.props;
    var containerStyle = disabled ? this.props.containerDisabledStyle:this.props.containerStyle;
    return (
      <TouchableOpacity {...touchableProps} testID={this.props.testID} style={containerStyle}>          
        {this._renderGroupedChildren(disabled)}
      </TouchableOpacity>
    );
  },

  _renderGroupedChildren(disabled) {
    
    var style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      disabled ? this.props.styleDisabled : null,
    ];

    var children = coalesceNonElementChildren(this.props.children, (children, index) => {
      return (
        <Text key={index} style={style}>
          {children}
        </Text>
      );
    });

    switch (children.length) {
      case 0:
        return null;
      case 1:
        return children[0];
      default:
        return <View style={styles.group}>{children}</View>;
    }
  },

  _computeActiveOpacity() {
    if (this.props.disabled) {
      return 1;
    }
    return this.props.activeOpacity != null ?
      this.props.activeOpacity :
      systemButtonOpacity;
  },
});

var styles = StyleSheet.create({
  text: {
    color: '#007aff',
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledText: {
    color: '#dcdcdc',
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

module.exports = Button;
