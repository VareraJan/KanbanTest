import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBoard } from '../../shared/ui'
import { BoardService } from '../../services/board.service'

/* getAll */
export const getAll = createAsyncThunk<IBoard[]>(
	'kanban/getAll',
	async (_, thunkApi) => {
		try {
			const response = await BoardService.getAll()
			return response
		} catch (error) {
			console.log(`[BOARD_GET_ALL] error ${error}`)
			return thunkApi.rejectWithValue(error)
		}
	}
)

/* setBoards */
export const setBoards = createAsyncThunk<IBoard[], IBoard[]>(
	'kanban/setBoards',
	async (boards, thunkApi) => {
		try {
			const response = await BoardService.setBoards(boards)
			return response
		} catch (error) {
			console.log(`[BOARD_SET_BOARDS] error ${error}`)
			return thunkApi.rejectWithValue(error)
		}
	}
)
