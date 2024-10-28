import { FC, useState } from 'react'
import { Informer } from '@consta/uikit/Informer'
import styles from './Toast.module.css'

interface Props {
	closeTimer: number
	status: 'alert' | 'success' | 'system' | 'warning' | undefined
	title: string | undefined
	label: React.ReactNode
}

export const Toast: FC<Props> = ({ closeTimer, status, label, title }) => {
	const [isOpen, setIsOpen] = useState<boolean>(true)

	setTimeout(() => setIsOpen(false), closeTimer * 1000)
	return isOpen ? (
		<div className={styles.container}>
			<Informer status={status} title={title} label={label} />
		</div>
	) : null
}
