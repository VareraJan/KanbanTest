import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialState } from './kanban.interface'
import { getAll } from './kanban.actions'
import { IBoard } from '../../shared/ui'
import { RootState } from '../store'

const initialState: IInitialState = {
	boards: [],
	isError: false,
	isLoading: false,
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<IBoard[]>) => {
			state.boards = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAll.pending, (state) => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(getAll.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.boards = payload
			})
			.addCase(getAll.rejected, (state) => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { setBoards } = kanbanSlice.actions

// export const selectBoards = (state: RootState) => state.kanban.boards

export const { reducer } = kanbanSlice
