import { useEffect, useMemo, useState } from 'react'
import { IBoard } from '../shared/ui'
import { BoardService } from '../services/board.service'

interface IUseBoardResponse {
	boards: IBoard[] | undefined
	setBoards: (boards: IBoard[]) => void
	isLoading: boolean
	isError: boolean
}

export const useBoard = (): IUseBoardResponse => {
	const [boards, setBoards] = useState<IBoard[]>()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		setIsError(false)
		BoardService.getAll()
			.then((data) => setBoards(data))
			.catch((e) => {
				console.log(`[BOARD_GET_ALL] error ${e}`)
				setIsError(true)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return useMemo(
		() => ({
			boards,
			setBoards,
			isLoading,
			isError,
		}),
		[boards, isError, isLoading]
	)
}
