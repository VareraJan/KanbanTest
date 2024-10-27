import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { IconTrash } from '@consta/icons/IconTrash'
import { Modal } from '@consta/uikit/Modal'
import { Button } from '@consta/uikit/Button'

import { FC, memo, useCallback, useState } from 'react'
import { IBoardColumnProps } from '../BoardColumn/BoardColumn'
import styles from './CardItem.module.css'
import { useActions } from '../../../hook/useActions'
import { withTooltip } from '@consta/uikit/withTooltip'

const TextWithTooltip = withTooltip()(Text)

export interface ICard {
	id: number
	title: string
	text: string
}

interface Props extends IBoardColumnProps {
	item: ICard
}

export const CardItem: FC<Props> = memo(
	({
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

		const closeModalHandler = () => setIsModalOpen(false)
		const openModalHandler = () => setIsModalOpen(true)

		const deleteCardHandler = useCallback(() => {
			deleteCard(item.id)
			setIsModalOpen(false)
		}, [deleteCard, item.id])

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
					{/* TODO донастроить Tooltip по необходимости? */}
					<TextWithTooltip
						// tooltipProps={{ content: item.title }}
						view="brand"
						size="l"
						align="center"
						truncate
					>
						{item.title}
					</TextWithTooltip>
					{/* TODO обрезать текст если больше определенного количества строк и донастроить Tooltip по необходимости? */}
					<TextWithTooltip
						// tooltipProps={{ content: item.text }}
						content={item.text}
						as="p"
						// className={styles.text}
					>
						{item.text}
					</TextWithTooltip>
					<div className={styles.footer}>
						<IconTrash
							view="brand"
							onClick={openModalHandler}
							className={styles.icon}
						/>
					</div>
				</Card>
				<Modal
					isOpen={isModalOpen}
					hasOverlay
					onClickOutside={closeModalHandler}
					onEsc={closeModalHandler}
					className={styles.modal}
				>
					<Text as="h3" align="center">
						Вы точно хотите удалить карточку "{item.title}"?
					</Text>

					<div className={styles.modalBtn}>
						<Button
							size="m"
							view="primary"
							label="Отменить"
							width="default"
							onClick={closeModalHandler}
						/>
						<Button
							size="m"
							view="primary"
							label="Удалить"
							width="default"
							onClick={deleteCardHandler}
						/>
					</div>
				</Modal>
			</>
		)
	}
)
