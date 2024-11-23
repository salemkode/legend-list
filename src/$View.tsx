import * as React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { ListenerType, use$ } from './state';

interface ContainerStyleProps extends ViewProps {
    $key: ListenerType;
    $style: () => ViewStyle;
}

export function $View({ $key, $style, ...rest }: ContainerStyleProps) {
    use$($key);
    const style = $style();
    return <View style={style} {...rest} />;
}
