import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import coalesceNonElementChildren from './coalesceNonElementChildren';

const systemButtonOpacity = 0.2;

export default class Button extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    accessibilityLabel: PropTypes.string,
    allowFontScaling: Text.propTypes.allowFontScaling,
    containerStyle: ViewPropTypes.style,
    disabledContainerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
  };

  render() {
    let touchableProps = {
      activeOpacity: this._computeActiveOpacity(),
    };
    let containerStyle = [
      this.props.containerStyle,
      this.props.disabled ? this.props.disabledContainerStyle : null
    ];

    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress;
      touchableProps.onPressIn = this.props.onPressIn;
      touchableProps.onPressOut = this.props.onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
      touchableProps.delayPressIn = this.props.delayPressIn;
      touchableProps.delayPressOut = this.props.delayPressOut;
      touchableProps.delayLongPress = this.props.delayLongPress;
    }

    return (
      <TouchableOpacity
        {...touchableProps}
        testID={this.props.testID}
        style={containerStyle}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityTraits="button"
        accessibilityComponentType="button">
        {this._renderGroupedChildren()}
      </TouchableOpacity>
    );
  }

  _renderGroupedChildren() {
    let { disabled } = this.props;
    let style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      disabled ? this.props.styleDisabled : null,
    ];

    let children = coalesceNonElementChildren(this.props.children, (children, index) => {
      return (
        <Text key={index} style={style} allowFontScaling={this.props.allowFontScaling}>
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
  }

  _computeActiveOpacity() {
    if (this.props.disabled) {
      return 1;
    }
    return this.props.activeOpacity != null ?
      this.props.activeOpacity :
      systemButtonOpacity;
  }
};

const styles = StyleSheet.create({
  text: {
    color: '#007aff',
    fontSize: 17,
    fontWeight: '500',
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
