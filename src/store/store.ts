import { configureStore } from '@reduxjs/toolkit'
import { reducer as KanbanReducer } from './kanban/kanban.slice'

export const store = configureStore({
	reducer: {
		kanban: KanbanReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
