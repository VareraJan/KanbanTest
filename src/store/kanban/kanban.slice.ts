import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialState } from './kanban.interface'
import { addCard, deleteCard, getAll, setBoards } from './kanban.actions'
import { IBoard } from '../../shared/ui'

const initialState: IInitialState = {
	boards: undefined,
	isError: false,
	isLoading: false,
}

export const kanbanSlice = createSlice({
	name: 'kanban',
	initialState,
	reducers: {},
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

			.addCase(setBoards.pending, (state) => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(setBoards.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.boards = payload
			})
			.addCase(setBoards.rejected, (state) => {
				state.isLoading = false
				state.isError = true
			})

			.addCase(deleteCard.pending, (state) => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(deleteCard.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.boards = payload
			})
			.addCase(deleteCard.rejected, (state) => {
				state.isLoading = false
				state.isError = true
			})

			.addCase(addCard.pending, (state) => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(addCard.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.boards = payload
			})
			.addCase(addCard.rejected, (state) => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reducer } = kanbanSlice
