// import { axiosInstance } from '../api/instance'
// import { IBoard } from '../shared/ui'
import { IBoard } from '../shared/ui'
import { getBoards } from './backendMock'

// бэкенда не существует, запросы прописаны и закоментированны, вместо них возвращается имитация работы бекенда
export const BoardService = {
	async getAll(): Promise<IBoard[]> {
		// return (await axiosInstance.get<IBoard[]>('/board')).data
		return getBoards as Promise<IBoard[]>
	},
}
