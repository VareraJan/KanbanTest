import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBoard } from '../../shared/ui'
import { BoardService } from '../../services/board.service'

/* getAll */
export const getAll = createAsyncThunk<IBoard[]>(
	'board/getAll',
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
