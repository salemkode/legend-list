import * as React from 'react';
import { use$ } from '@legendapp/state/react';
import { View, ViewProps, ViewStyle } from 'react-native';

interface ContainerStyleProps extends ViewProps {
    $style: () => ViewStyle;
}

export function $View({ $style, ...rest }: ContainerStyleProps) {
    const style = use$($style);
    return <View style={style} {...rest} />;
}
