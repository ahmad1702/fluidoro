import React from 'react'
import { type TextProps, Text } from 'react-native'
import { cn } from '~/utils/utilts';


type Props = TextProps & {
    children: React.ReactNode;
    invert?: boolean;
}

const Texty = ({ className, children, invert = false, ...props }: Props) => {
    return (
        <Text {...props} className={cn(invert ? 'text-white dark:text-black' : 'text-black dark:text-white', className)}>{children}</Text>
    )
}

export default Texty