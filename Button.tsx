import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
    StyleProp,
    TextStyle,
    TouchableOpacityProps
} from 'react-native';

import coalesceNonElementChildren from './coalesceNonElementChildren';

const systemButtonOpacity = 0.2;

interface propTypes extends TouchableOpacityProps {
    accessibilityLabel?: string,
    textID?: string,
    allowFontScaling?: boolean,
    disabled?: boolean,
    containerStyle?: StyleProp<ViewStyle>,
    disabledContainerStyle?: StyleProp<ViewStyle>,
    style?: StyleProp<TextStyle>,
    styleDisabled?: StyleProp<TextStyle>,
    childGroupStyle?: StyleProp<ViewStyle>,
    children: React.ReactChild
}


export default function Button({
                                   disabled,
                                   activeOpacity,
                                   style,
                                   styleDisabled,
                                   childGroupStyle,
                                   children,
                                   allowFontScaling,
                                   containerStyle,
                                   disabledContainerStyle,
                                   onPress,
                                   onPressIn,
                                   onPressOut,
                                   onLongPress,
                                   delayPressIn,
                                   delayPressOut,
                                   delayLongPress,
                                   testID,
                                   accessibilityLabel
                               }: propTypes) {
    function _computeActiveOpacity() {
        if (disabled) {
            return 1;
        }
        return activeOpacity != null ?
            activeOpacity :
            systemButtonOpacity;
    }

    function _renderGroupedChildren() {
        let styleRenderGroup = [
            styles.text,
            disabled ? styles.disabledText : null,
            style,
            disabled ? styleDisabled : null,
        ];
        let childGroupStyleCustom = [
            styles.group,
            childGroupStyle,
        ];
        const childrenCustom = coalesceNonElementChildren(children, (children: React.ReactNode, index: string | number | undefined) => {
            return (
                <Text key={index} style={styleRenderGroup} {...{allowFontScaling}}>
                    {childrenCustom}
                </Text>
            );
        });

        switch (childrenCustom.length) {
            case 0:
                return null;
            case 1:
                return childrenCustom[0];
            default:
                return <View style={childGroupStyleCustom}>{childrenCustom}</View>;
        }
    }


    const touchableProps: TouchableOpacityProps = {
        activeOpacity: _computeActiveOpacity(),

    };
    const containerStyleCustom = [
        containerStyle,
        disabled ? disabledContainerStyle : null
    ];

    if (!disabled) {
        touchableProps.onPress = onPress;
        touchableProps.onPressIn = onPressIn;
        touchableProps.onPressOut = onPressOut;
        touchableProps.onLongPress = onLongPress;
        touchableProps.delayPressIn = delayPressIn;
        touchableProps.delayPressOut = delayPressOut;
        touchableProps.delayLongPress = delayLongPress;
    }

    return (
        <TouchableOpacity
            {...{
                touchableProps, testID, accessibilityLabel
            }}
            style={containerStyleCustom}
            accessibilityRole="button">
            {_renderGroupedChildren()}
        </TouchableOpacity>
    );
}


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
