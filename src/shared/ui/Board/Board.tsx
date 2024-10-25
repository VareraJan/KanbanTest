import { GridItem } from '@consta/uikit/Grid'
import { Text } from '@consta/uikit/Text'
import { DragEvent, FC } from 'react'
import styles from './Board.module.css'
import { CardItem, ICard } from '../CardItem/CardItem'

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
	return (
		<GridItem
			key={board.id}
			onDragOver={(e) => dragOverHandler(e)}
			onDrop={(e) => dropHandler(e, board)}
		>
			<Text align="center" truncate key={board.id} className={styles.title}>
				{board.title}
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
	)
}
