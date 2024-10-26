// import { axiosInstance } from '../api/instance'
// import { IBoard } from '../shared/ui'
import { IBoard } from '../shared/ui'
import { getBoards, setBoardsBack } from './backendMock'

// бэкенда не существует, запросы прописаны и закоментированны, вместо них возвращается имитация работы бекенда
// TODO: логика работы бекенда такова, что на каждый запрос он возвращает доски или ошибку
export const BoardService = {
	async getAll(): Promise<IBoard[]> {
		// return (await axiosInstance.get<IBoard[]>('/board')).data
		return getBoards as Promise<IBoard[]>
	},

	// при перемещении карточки внутри доски/между досками отправляет изменения на сервер
	async setBoards(newBoard: IBoard[]): Promise<IBoard[]> {

		// return (await axiosInstance.put('/board', { data: newBoard })).data
		return setBoardsBack(newBoard)
	},
}
