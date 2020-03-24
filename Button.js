import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  ViewPropTypes
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
    childGroupStyle: ViewPropTypes.style,
    androidBackground: PropTypes.object,
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

    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          {...touchableProps}
          testID={this.props.testID}
          style={containerStyle}
          accessibilityLabel={this.props.accessibilityLabel}
          accessibilityRole="button">
          {this._renderGroupedChildren()}
        </TouchableOpacity>
      );
    } else {
      const background = this.props.androidBackground
        ? this.props.androidBackground
        : TouchableNativeFeedback.SelectableBackground();

      let padding = 0;
      if (containerStyle[0] && containerStyle[0].padding) {
        padding = containerStyle[0].padding;
        const fixedStyle = Object.assign({}, containerStyle[0], {padding: 0});
        containerStyle[0] = fixedStyle;
      }

      return (
        <View style={containerStyle}>
          <TouchableNativeFeedback
            {...touchableProps}
            style={{flex: 1}}
            testID={this.props.testID}
            accessibilityLabel={this.props.accessibilityLabel}
            accessibilityRole="button"
            background={background}>
            <View style={{padding: padding}}>
              {this._renderGroupedChildren()}
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    }
  }

  _renderGroupedChildren() {
    let { disabled } = this.props;
    let style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      disabled ? this.props.styleDisabled : null,
    ];
    let childGroupStyle = [
      styles.group,
      this.props.childGroupStyle,
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
        return <View style={childGroupStyle}>{children}</View>;
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
