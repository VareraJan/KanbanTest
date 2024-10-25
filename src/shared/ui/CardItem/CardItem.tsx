import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { FC } from 'react'
import { IBoardProps } from '../Board/Board'
import styles from './CardItem.module.css'

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
	return (
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
			<Text align="center" truncate>
				{item.title}
			</Text>
			<Text truncate>{item.text}</Text>
		</Card>
	)
}
