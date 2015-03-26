# react-native-button
A button for React apps

# Usage

Install the button from npm with `npm install react-native-button` or add it to the list of dependencies in your React project's `package.json` file. Then, require it from your app's JavaScript files with `require('react-native-button')`.

```js
var Button = require('react-native-button');
var React = require('react-native');

var ExampleComponent = React.createClass({
  render() {
    return (
      <Button style={{color: 'green'}} onPress={this._handlePress}>
        Press Me!
      </Button>
    );
  },

  _handlePress(event) {
    console.log('Pressed!');
  },
});

module.exports = ExampleComponent;
```

The React packager will include the Button component in your app's JS package and make it available for your app to use.

# Contributing

Contributions are welcome. Please verify that styling matches the latest version of iOS when you are changing the visual look of the buttons.
