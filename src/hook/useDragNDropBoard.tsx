import { DragEvent, useCallback, useMemo, useState } from 'react'
import { IBoard, ICard } from '../shared/ui'
import { useActions } from './useActions'
import { useAppSelector } from './useAppSelector'

export const useDragNDropBoard = () => {
	const boards = useAppSelector((state) => state.kanban.boards)
	const { setBoards } = useActions()
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

	const dropHandler = useCallback(
		(e: DragEvent<HTMLDivElement>, board: IBoard, item?: ICard) => {
			e.preventDefault()
			e.stopPropagation()
			const dropB = JSON.parse(JSON.stringify(board))
			const changeCurrentBoard = JSON.parse(
				JSON.stringify(currentBoard)
			) as IBoard

			if (currentItem && currentBoard) {
				const isChange = dropB.id - currentBoard.id === 1
				const isSort = dropB.id - currentBoard.id === 0

				if (isSort) {
					const currentIndex = currentBoard.items.indexOf(currentItem)
					dropB.items.splice(currentIndex, 1)

					const sortIndex = item
						? currentBoard.items.indexOf(item)
						: currentBoard.items.length
					dropB.items.splice(sortIndex, 0, currentItem)
				}

				if (isChange) {
					const currentIndex = currentBoard.items.indexOf(currentItem)

					changeCurrentBoard.items.splice(currentIndex, 1)

					const dropIndex = item
						? board.items.indexOf(item)
						: board.items.length

					dropB.items.splice(dropIndex, 0, currentItem)
				}

				if (isChange || isSort) {
					if (boards) {
						setBoards(
							boards.map((b) => {
								if (b.id === dropB.id) {
									return dropB
								}
								if (b.id === changeCurrentBoard.id) {
									return changeCurrentBoard
								}

								return b
							})
						)
					}
				}
			}
		},
		[boards, currentBoard, currentItem, setBoards]
	)

	return useMemo(
		() => ({
			dragStartHandler,
			dragOverHandler,
			dragLeaveHandler,
			dragEndHandler,
			dropHandler,
		}),
		[dropHandler]
	)
}
