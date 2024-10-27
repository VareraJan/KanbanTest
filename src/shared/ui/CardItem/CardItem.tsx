import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { IconTrash } from '@consta/icons/IconTrash'
import { Modal } from '@consta/uikit/Modal'
import { Button } from '@consta/uikit/Button'

import { FC, useState } from 'react'
import { IBoardProps } from '../Board/Board'
import styles from './CardItem.module.css'
import { useActions } from '../../../hook/useActions'

export interface ICard {
	id: number
	title: string
	text: string
}

interface Props extends IBoardProps {
	item: ICard
}

export const CardItem: FC<Props> = ({
	item,
	board,
	dragEndHandler,
	dragLeaveHandler,
	dragOverHandler,
	dragStartHandler,
	dropHandler,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { deleteCard } = useActions()

	return (
		<>
			<Card
				form="round"
				border
				verticalSpace="s"
				horizontalSpace="s"
				className={styles.card}
				draggable={true}
				onDragOver={(e) => dragOverHandler(e)}
				onDragLeave={(e) => dragLeaveHandler(e)}
				onDragStart={(e) => dragStartHandler(e, board, item)}
				onDragEnd={(e) => dragEndHandler(e)}
				onDrop={(e) => dropHandler(e, board, item)}
			>
				<Text view="brand" size="l" align="center" truncate>
					{item.title}
				</Text>
				<Text as="p" className={styles.text}>
					{item.text}
				</Text>
				<div className={styles.footer}>
					<IconTrash
						view="brand"
						onClick={() => setIsModalOpen(true)}
						className={styles.icon}
					/>
				</div>
			</Card>
			<Modal
				isOpen={isModalOpen}
				hasOverlay
				onClickOutside={() => setIsModalOpen(false)}
				onEsc={() => setIsModalOpen(false)}
				className={styles.modal}
			>
				<Text as="h1" align="center">
					Вы точно хотите удалить карточку "{item.title}"?
				</Text>

				<div className={styles.modalBtn}>
					<Button
						size="m"
						view="primary"
						label="Не удалять"
						width="default"
						onClick={() => setIsModalOpen(false)}
					/>
					<Button
						size="m"
						view="primary"
						label="Удалить"
						width="default"
						onClick={() => {
							deleteCard(item.id)
							setIsModalOpen(false)
						}}
					/>
				</div>
			</Modal>
		</>
	)
}
