import { useEffect, useMemo } from 'react'
import { IBoard } from '../shared/ui'
import { useAppSelector } from './useAppSelector'
import { useActions } from './useActions'

interface IUseBoardResponse {
	boards: IBoard[] | undefined
	setBoards: (boards: IBoard[]) => void
	isLoading: boolean
	isError: boolean
}

export const useBoard = (): IUseBoardResponse => {
	const { isError, isLoading, boards } = useAppSelector((state) => state.kanban)
	const { getAll, setBoards } = useActions()

	useEffect(() => {
		getAll()
	}, [])

	return useMemo(
		() => ({
			boards,
			setBoards,
			isLoading,
			isError,
		}),
		[boards, isError, isLoading, setBoards]
	)
}
