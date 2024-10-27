import { IBoard } from '../shared/ui'
import { ICreateCard } from './board.service'

const boards = [
	{
		id: 1,
		title: 'Очередь',
		items: [
			{
				id: 1,
				title: 'Task 1',
				text: 'loren ipsum harasan mugada prep consum',
			},
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
			{ id: 10, title: 'Task 10', text: 'loren ipsum' },
			{ id: 11, title: 'Task 11', text: 'loren ipsum' },
		],
	},
]

export const getBoards = (): Promise<IBoard[]> =>
	new Promise((res) => {
		setTimeout(() => res(boards), 1500)
	})

export const setBoardsBack = (data: IBoard[]): Promise<IBoard[]> =>
	new Promise((res) => {
		setTimeout(() => res(data), 1000)
	})

export const addCardBack = (data: ICreateCard): Promise<IBoard[]> =>
	new Promise((res) => {
		setTimeout(() => {
			const id = Math.round(Math.random() * 1000)
			const newBoard = JSON.parse(JSON.stringify(boards))

			newBoard[0].items.push({ id, ...data })
			res(newBoard)
		}, 1000)
	})
