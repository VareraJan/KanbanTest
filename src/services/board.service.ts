import { axiosInstance } from '../api/instance'
import { IBoard, ICard } from '../shared/ui'
import { addCardBack, getBoards, setBoardsBack } from './backendMock'

export type ICreateCard = Omit<ICard, 'id'>

// бэкенда не существует, запросы прописаны и закоментированны, вместо них возвращается имитация работы бекенда
// TODO: логика работы бекенда такова, что на каждый запрос он возвращает доски или ошибку
export const BoardService = {
	async getAll(): Promise<IBoard[]> {
		// return (await axiosInstance.get<IBoard[]>('/board')).data
		return getBoards()
	},

	// при перемещении карточки внутри доски/между досками отправляет изменения на сервер
	async setBoards(newBoard: IBoard[]): Promise<IBoard[]> {
		// return (await axiosInstance.put<IBoard[]>('/board', { data: newBoard })).data
		return setBoardsBack(newBoard)
	},

	async deleteCard(id: number): Promise<IBoard[]> {
		// return (await axiosInstance.delete<IBoard[]>('/card', { data: id })).data
		return getBoards()
	},

	async addCard(data: ICreateCard): Promise<IBoard[]> {
		// return (await axiosInstance.post<IBoard[]>('/card', { data })).data
		return addCardBack(data)
	},
}
