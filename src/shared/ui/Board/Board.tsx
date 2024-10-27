import { GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { DragEvent, FC, useState } from 'react'
import { CardItem, ICard } from '../CardItem/CardItem'
import { IconAdd } from '@consta/icons/IconAdd'
import { TextField } from '@consta/uikit/TextField'

import styles from './Board.module.css'
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'
import { useActions } from '../../../hook/useActions'

interface IError {
	title: string | null
	text: string | null
}

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

	const [error, setError] = useState<IError>({ text: null, title: null })

	const { addCard } = useActions()

	const submitHandler = () => {
		if (!title || !text) {
			setError({
				text: text ? null : 'Поле не может быть пустым',
				title: title ? null : 'Поле не может быть пустым',
			})

			setTimeout(() => setError({ text: null, title: null }), 3000)
			return
		}
		addCard({ title, text })
		setIsModalOpen(false)
	}

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
						required
						autoFocus
						{...(error.title
							? { caption: `${error.title}`, status: 'warning' }
							: null)}
					/>
					<TextField
						onChange={textHandler}
						value={text}
						type="textarea"
						rows={3}
						placeholder="текст карточки"
						label="Содержание:"
						withClearButton
						required
						{...(error.text
							? { caption: `${error.text}`, status: 'warning' }
							: null)}
					/>
				</div>
				<div className={styles.modalBtn}>
					<Button
						size="m"
						view="primary"
						label="Создать карточку"
						width="default"
						onClick={() => submitHandler()}
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
