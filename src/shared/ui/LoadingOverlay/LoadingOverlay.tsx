import { FC, ReactNode } from 'react'
import { Loader } from '@consta/uikit/Loader'

import styles from './LoadingOverlay.module.css'

interface Props {
	loading: boolean
	children: ReactNode
}

export const LoadingOverlay: FC<Props> = ({ loading, children }) => {
	if (!loading) return children

	return (
		<>
			{children}
			<div className={styles['loading-overlay']}>
				<Loader size="m" />
			</div>
		</>
	)
}
