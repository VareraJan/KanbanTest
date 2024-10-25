import { FC, ReactNode } from 'react'
import { presetGpnDefault, Theme } from '@consta/uikit/Theme'

interface Props {
	children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
	return <Theme preset={presetGpnDefault}>{children}</Theme>
}
