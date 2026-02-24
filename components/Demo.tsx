import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './Demo.module.css';

export default function Demo() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="transparent"
            color="gray"
            size="lg"
            aria-label="Toggle color scheme"
        >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} size={24} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} size={24} />
        </ActionIcon>
    );
}