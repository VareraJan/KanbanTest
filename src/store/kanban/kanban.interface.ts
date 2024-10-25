import { IBoard } from '../../shared/ui'

export interface IInitialState {
	boards?: IBoard[]
	isLoading: boolean
	isError: boolean
}
