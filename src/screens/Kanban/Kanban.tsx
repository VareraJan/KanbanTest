import { FC, useState } from 'react'
import { Grid, GridItem } from '@consta/uikit/Grid'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'

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
	const [boards, setBoards] = useState<IBoard[]>([
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
	])

	return (
		<div>
			<Grid gap={'s'} cols={4}>
				{boards.map((board) => (
					<GridItem key={board.id}>
						{board.items.map((item) => (
							<Card
								form="round"
								verticalSpace="s"
								horizontalSpace="s"
								key={item.id}
							>
								<Text>{item.title}</Text>
								<Text>{item.text}</Text>
							</Card>
						))}
					</GridItem>
				))}
			</Grid>
		</div>
	)
}
