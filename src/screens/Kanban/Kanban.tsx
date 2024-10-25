import { DragEvent, FC, useState } from 'react'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import styles from './Kanban.module.css'

const getBoards = [
	{
		id: 1,
		title: 'Очередь',
		items: [
			{ id: 1, title: 'Task 1', text: 'loren ipsum' },
			{ id: 2, title: 'Task 2', text: 'loren ipsum' },
			{ id: 3, title: 'Task 3', text: 'loren ipsum' },
		],
	},
	{
		id: 2,
		title: 'В работе',
		items: [
			{ id: 4, title: 'Task 4', text: 'loren ipsum' },
			{ id: 5, title: 'Task 5', text: 'loren ipsum' },
			{ id: 6, title: 'Task 6', text: 'loren ipsum' },
			{ id: 7, title: 'Task 7', text: 'loren ipsum' },
		],
	},
	{
		id: 3,
		title: 'На проверке',
		items: [
			{ id: 8, title: 'Task 8', text: 'loren ipsum' },
			{ id: 9, title: 'Task 9', text: 'loren ipsum' },
		],
	},
	{
		id: 4,
		title: 'Выполнено',
		items: [
			{ id: 10, title: 'Task 8', text: 'loren ipsum' },
			{ id: 11, title: 'Task 9', text: 'loren ipsum' },
		],
	},
]
interface ICard {
	id: number
	title: string
	text: string
}

interface IBoard {
	id: number
	title: string
	items: ICard[]
}

export const Kanban: FC = () => {
	const [boards, setBoards] = useState<IBoard[]>(getBoards)

	const [currentItem, setCurrentItem] = useState<ICard>()
	const [currentBoard, setCurrentBoard] = useState<IBoard>()

	function dragStartHandler(
		e: DragEvent<HTMLDivElement>,
		board: IBoard,
		item: ICard
	): void {
		setCurrentItem(item)
		setCurrentBoard(board)
	}

	function dragOverHandler(e: DragEvent<HTMLDivElement>): void {
		e.preventDefault()
	}

	function dragLeaveHandler(e: DragEvent<HTMLDivElement>): void {}

	function dragEndHandler(e: DragEvent<HTMLDivElement>): void {}

	function dropHandler(
		e: DragEvent<HTMLDivElement>,
		board: IBoard,
		item?: ICard
	): void {
		e.preventDefault()
		e.stopPropagation()

		if (currentItem && currentBoard) {
			const currentIndex = currentBoard?.items.indexOf(currentItem)
			currentBoard.items.splice(currentIndex, 1)

			if (!item) {
				board.items.push(currentItem)
			} else {
				const dropIndex = board.items.indexOf(item)
				board.items.splice(dropIndex + 1, 0, currentItem)
			}

			setBoards(
				boards.map((b) => {
					if (b.id === board.id) {
						return board
					}
					if (b.id === currentBoard.id) {
						return currentBoard
					}

					return b
				})
			)
		}
	}

	return (
		<Grid gap={'s'} cols={4} style={{ height: '100%' }}>
			{boards.map((board) => (
				<GridItem
					key={board.id}
					onDragOver={(e) => dragOverHandler(e)}
					onDrop={(e) => dropHandler(e, board)}
				>
					<Text align="center" truncate key={board.id} className={styles.title}>
						{board.title}
					</Text>
					{board.items.map((item) => (
						<Card
							form="round"
							verticalSpace="s"
							horizontalSpace="s"
							key={item.id}
							className={styles.card}
							draggable={true}
							onDragOver={(e) => dragOverHandler(e)}
							onDragLeave={(e) => dragLeaveHandler(e)}
							onDragStart={(e) => dragStartHandler(e, board, item)}
							onDragEnd={(e) => dragEndHandler(e)}
							onDrop={(e) => dropHandler(e, board, item)}
						>
							<Text align="center" truncate>
								{item.title}
							</Text>
							<Text truncate>{item.text}</Text>
						</Card>
					))}
				</GridItem>
			))}
		</Grid>
	)
}
