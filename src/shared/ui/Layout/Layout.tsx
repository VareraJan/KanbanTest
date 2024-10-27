import { FC, memo, ReactNode } from 'react'
import { presetGpnDefault, Theme } from '@consta/uikit/Theme'
import styles from './Layout.module.css'

interface Props {
	children: ReactNode
}

export const Layout: FC<Props> = memo(({ children }) => {
	return (
		<Theme preset={presetGpnDefault} className={styles.container}>
			{children}
		</Theme>
	)
})
