import { useEffect, useMemo, useState } from 'react'
import { IBoard } from '../shared/ui'
import { BoardService } from '../services/board.service'
import { useAppSelector } from './useAppSelector'
import { setBoards } from '../store/kanban/kanban.slice'
import { useActions } from './useActions'

interface IUseBoardResponse {
	boards: IBoard[] | undefined
	setBoards: (boards: IBoard[]) => void
	isLoading: boolean
	isError: boolean
}

export const useBoard = (): IUseBoardResponse => {
	const { isError, isLoading, boards } = useAppSelector((state) => state.kanban)
	const { getAll } = useActions()

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
		[boards, isError, isLoading]
	)
}
