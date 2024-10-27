import { GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { DragEvent, FC, useState } from 'react'
import { CardItem, ICard } from '../CardItem/CardItem'
import { IconAdd } from '@consta/icons/IconAdd'
import { TextField } from '@consta/uikit/TextField'

import styles from './Board.module.css'
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'

export interface IBoard {
	id: number
	title: string
	items: ICard[]
}

export interface IBoardProps {
	board: IBoard
	dragStartHandler: (
		e: DragEvent<HTMLDivElement>,
		board: IBoard,
		item: ICard
	) => void
	dragOverHandler: (e: DragEvent<HTMLDivElement>) => void
	dragLeaveHandler: (e: DragEvent<HTMLDivElement>) => void
	dragEndHandler: (e: DragEvent<HTMLDivElement>) => void
	dropHandler: (
		e: DragEvent<HTMLDivElement>,
		board: IBoard,
		item?: ICard
	) => void
}

export const Board: FC<IBoardProps> = ({
	board,
	dragEndHandler,
	dragLeaveHandler,
	dragOverHandler,
	dragStartHandler,
	dropHandler,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [title, setTitle] = useState<string | null>(null)
	const [text, setText] = useState<string | null>(null)
	const titleHandler = (value: string | null) => setTitle(value)
	const textHandler = (value: string | null) => setText(value)

	return (
		<>
			<GridItem
				key={board.id}
				onDragOver={(e) => dragOverHandler(e)}
				onDrop={(e) => dropHandler(e, board)}
			>
				<Text align="center" truncate key={board.id} className={styles.title}>
					{board.title}
					{board.id === 1 && (
						<IconAdd
							size="s"
							view="link"
							className={styles.icon}
							onClick={() => setIsModalOpen(true)}
						/>
					)}
				</Text>
				{board.items.map((item) => (
					<CardItem
						key={item.id}
						item={item}
						board={board}
						dragOverHandler={dragOverHandler}
						dragLeaveHandler={dragLeaveHandler}
						dragStartHandler={dragStartHandler}
						dragEndHandler={dragEndHandler}
						dropHandler={dropHandler}
					/>
				))}
			</GridItem>
			<Modal
				isOpen={isModalOpen}
				hasOverlay
				onClickOutside={() => setIsModalOpen(false)}
				onEsc={() => setIsModalOpen(false)}
				className={styles.modal}
			>
				<Text as="h1" align="center">
					Создание карточки:
				</Text>
				<div className={styles.fieldContainer}>
					<TextField
						onChange={titleHandler}
						value={title}
						type="text"
						placeholder="Название карточки"
						label="Заголовок:"
						withClearButton
					/>
					<TextField
						onChange={textHandler}
						value={text}
						type="textarea"
						rows={3}
						placeholder="текст карточки"
						label="Содержание:"
						withClearButton
					/>
				</div>
				<div className={styles.modalBtn}>
					<Button
						size="m"
						view="primary"
						label="Создать карточку"
						width="default"
						onClick={() => setIsModalOpen(false)}
					/>
					<Button
						size="m"
						view="primary"
						label="Отмена"
						width="default"
						onClick={() => {
							setIsModalOpen(false)
						}}
					/>
				</div>
			</Modal>
		</>
	)
}
