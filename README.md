# react-native-button
A button for React apps

# Usage

Install the button from npm with `npm install react-native-button --save`. Then, require it from your app's JavaScript files with `import Button from 'react-native-button'`.

```js
import React, { Component } from 'react';
import Button from 'react-native-button';

export default class ExampleComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }
  _handlePress() {
    console.log('Pressed!');
  }
  render() {
    return (
      <Button
        style={{fontSize: 20, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={() => this._handlePress()}>
        Press Me!
      </Button>
    );
  }
};

```

The React packager will include the Button component in your app's JS package and make it available for your app to use.

## Disabled prop usage

You can control a button's state by setting `disabled` prop value in this way:

```js
import React, { Component } from 'react';
import Button from 'react-native-button';

export default class ExampleComponent extends Component {
  constructor(props, context) {
    super(props, context);
      this.state = {
        isDisabled: false
      }
    }
  _handlePress() {
    this.setState({
      isDisabled: true
    });
    console.log('Now, button disabled');
  }
  render() {
    const { isDisabled } = this.state;
    return (
      <Button
        style={{ fontSize: 20, color: 'white' }}
        styleDisabled={{ color: 'white' }}
        disabled={isDisabled}
        containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'aqua' }}
        disabledContainerStyle={{ backgroundColor: 'pink' }}
        onPress={() => this._handlePress()}
      >
        Press Me!
      </Button>
    );
  }
};

```

## Props

<table>
  <tr>
    <th>Prop</th>
    <th>Required</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>accessibilityLabel</td>
    <td>No</td>
    <td>String</td>
    <td>VoiceOver will read this string when a user selects the associated element.</td>
  </tr>
  <tr>
    <td>allowFontScaling</td>
    <td>No</td>
    <td>Bool</td>
    <td>Specifies whether fonts should scale to respect Text Size accessibility settings. </td>
  </tr>
  
  <tr>
    <td>Disabled</td>
    <td>No</td>
    <td>Bool</td>
    <td>Disables the button</td>
  </tr>
  <tr>
    <td>Style</td>
    <td>No</td>
    <td>View Style Prop</td>
    <td>The style for the button</td>
  </tr>
  <tr>
    <td>styleDisabled</td>
    <td>No</td>
    <td>View Style Prop</td>
    <td>The style for the disabled button</td>
  </tr>
  <tr>
    <td>containerStyle</td>
    <td>No</td>
    <td>View Style Prop</td>
    <td>The style for the container</td>
  </tr>
  <tr>
    <td>disabledContainerStyle</td>
    <td>No</td>
    <td>View Style Prop</td>
    <td>The style for the container when the button is disabled</td>
  </tr>
  <tr>
    <td>childGroupStyle</td>
    <td>No</td>
    <td>View Style Prop</td>
    <td>The style for the child views</td>
  </tr>
  <tr>
    <td>androidBackground</td>
    <td>No</td>
    <td>Background Prop Type</td>
    <td>The background for andriod devices.</td>
  </tr>
  <tr>
    <td>onPress</td>
    <td>No</td>
    <td>Function</td>
    <td>Handler to be called when the user taps the button. </td>
  </tr>
</table>

## Container Style

You can make a button with rounded corners like this:

```js
  <Button
    containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
    disabledContainerStyle={{backgroundColor: 'grey'}}
    style={{fontSize: 20, color: 'green'}}>
    Press me!
  </Button>
```

# Contributing

Contributions are welcome. Please verify that styling matches the latest version of iOS when you are changing the visual look of the buttons.
