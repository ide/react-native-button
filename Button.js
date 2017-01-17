import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import coalesceNonElementChildren from './coalesceNonElementChildren'

const systemButtonOpacity = 0.2

export default class Button extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    containerStyle: View.propTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style
  };

  render () {
    let touchableProps = {
      activeOpacity: this._computeActiveOpacity()
    }
    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress
      touchableProps.onPressIn = this.props.onPressIn
      touchableProps.onPressOut = this.props.onPressOut
      touchableProps.onLongPress = this.props.onLongPress
    }

    return (
      <TouchableOpacity
        {...touchableProps}
        testID={this.props.testID}
        style={this.props.containerStyle}
        accessibilityTraits='button'
        accessibilityComponentType='button'
      >
        {this._renderGroupedChildren()}
      </TouchableOpacity>
    )
  }

  _renderGroupedChildren () {
    let { disabled } = this.props
    let style = [
      styles.text,
      disabled ? styles.disabledText : null,
      this.props.style,
      disabled ? this.props.styleDisabled : null
    ]

    let children = coalesceNonElementChildren(this.props.children, (children, index) => {
      return (
        <Text key={index} style={style}>
          {children}
        </Text>
      )
    })

    switch (children.length) {
      case 0:
        return null
      case 1:
        return children[0]
      default:
        return <View style={styles.group}>{children}</View>
    }
  }

  _computeActiveOpacity () {
    if (this.props.disabled) {
      return 1
    }
    return this.props.activeOpacity != null ? this.props.activeOpacity : systemButtonOpacity
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#007aff',
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  disabledText: {
    color: '#dcdcdc'
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
