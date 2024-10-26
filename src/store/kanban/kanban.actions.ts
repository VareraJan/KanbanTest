import { createAsyncThunk } from '@reduxjs/toolkit'
import { IBoard } from '../../shared/ui'
import { BoardService, ICreateCard } from '../../services/board.service'

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

/* deleteCard */
export const deleteCard = createAsyncThunk<IBoard[], number>(
	'kanban/deleteCard',
	async (idCard, thunkApi) => {
		try {
			const response = await BoardService.deleteCard(idCard)
			return response
		} catch (error) {
			console.log(`[DELETE_CARD] error ${error}`)
			return thunkApi.rejectWithValue(error)
		}
	}
)

/* addCard */
export const addCard = createAsyncThunk<IBoard[], ICreateCard>(
	'kanban/addCard',
	async (data, thunkApi) => {
		try {
			const response = await BoardService.addCard(data)
			return response
		} catch (error) {
			console.log(`[DELETE_CARD] error ${error}`)
			return thunkApi.rejectWithValue(error)
		}
	}
)
