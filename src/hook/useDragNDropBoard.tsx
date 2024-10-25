import { DragEvent, useCallback, useMemo, useState } from 'react'
import { IBoard, ICard } from '../shared/ui'

interface Props {
	boards?: IBoard[]
	setBoards: (boards: IBoard[]) => void
}

export const useDragNDropBoard = ({ boards, setBoards }: Props) => {
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

			if (currentItem && currentBoard) {
				const isChange =
					board.id - currentBoard.id === 1 || board.id - currentBoard.id === 0

				if (isChange) {
					const currentIndex = currentBoard.items.indexOf(currentItem)
					currentBoard.items.splice(currentIndex, 1)

					if (!item) {
						board.items.push(currentItem)
					} else {
						const dropIndex = board.items.indexOf(item)
						board.items.splice(dropIndex, 0, currentItem)
					}

					if (boards) {
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
