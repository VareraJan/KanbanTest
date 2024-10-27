import { GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { DragEvent, FC, memo, useCallback, useState } from 'react'
import { CardItem, ICard } from '../CardItem/CardItem'
import { IconAdd } from '@consta/icons/IconAdd'
import { TextField, TextFieldPropStatus } from '@consta/uikit/TextField'

import styles from './BoardColumn.module.css'
import { Button } from '@consta/uikit/Button'
import { Modal } from '@consta/uikit/Modal'
import { useActions } from '../../../hook/useActions'

import { withTooltip } from '@consta/uikit/withTooltip'

const IconWithTooltip = withTooltip({ content: 'Создать карточку' })(IconAdd)

interface IError {
	title: string | null
	text: string | null
}

export interface IBoard {
	id: number
	title: string
	items: ICard[]
}

export interface IBoardColumnProps {
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

export const BoardColumn: FC<IBoardColumnProps> = memo(
	({
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

		const closeModalHandler = () => setIsModalOpen(false)
		const openModalHandler = () => setIsModalOpen(true)

		const submitHandler = useCallback(() => {
			if (!title || !text) {
				setError({
					text: text ? null : 'Поле не может быть пустым',
					title: title ? null : 'Поле не может быть пустым',
				})

				setTimeout(() => setError({ text: null, title: null }), 3000)
				return
			}
			addCard({ title, text })
			setTitle(null)
			setText(null)
			setIsModalOpen(false)
		}, [addCard, text, title])

		const getErrorProps = useCallback(
			(txt: string | null) =>
				txt
					? { caption: `${txt}`, status: 'warning' as TextFieldPropStatus }
					: null,
			[]
		)

		return (
			<>
				<GridItem
					key={board.id}
					onDragOver={(e) => dragOverHandler(e)}
					onDrop={(e) => dropHandler(e, board)}
					className={styles.boardColumn}
				>
					<Text align="center" truncate key={board.id} className={styles.title}>
						{board.title}
						{board.id === 1 && (
							<IconWithTooltip
								size="s"
								view="link"
								className={styles.icon}
								onClick={openModalHandler}
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
					onClickOutside={closeModalHandler}
					onEsc={closeModalHandler}
					className={styles.modal}
				>
					<Text as="h3" align="center">
						Создание карточки
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
							{...getErrorProps(error.title)}
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
							{...getErrorProps(error.text)}
						/>
					</div>
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
							label="Создать карточку"
							width="default"
							onClick={submitHandler}
						/>
					</div>
				</Modal>
			</>
		)
	}
)
