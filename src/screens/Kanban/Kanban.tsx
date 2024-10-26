import { FC, useEffect } from 'react'
import { Grid } from '@consta/uikit/Grid'
import { Board } from '../../shared/ui'
import { useAppSelector, useDragNDropBoard } from '../../hook/'
import { useActions } from '../../hook/useActions'

export const Kanban: FC = () => {
	const { isError, isLoading, boards } = useAppSelector((state) => state.kanban)
	const { getAll } = useActions()

	useEffect(() => {
		getAll()
	}, [])

	const {
		dragEndHandler,
		dragLeaveHandler,
		dragOverHandler,
		dragStartHandler,
		dropHandler,
	} = useDragNDropBoard()

	// TODO разработать/уточнить механизм оповещения пользователя об ошибке
	if (isError) return <div>Ошибка загрузки данных</div>

	// TODO заменить состояние загрузки на скелетоны(прокинуть пропсами в компоненты?)
	return (
		<Grid gap={'s'} cols={4} style={{ height: '100%' }}>
			{isLoading && <div>...Loading......</div>}
			{!isLoading &&
				boards &&
				boards.map((board) => (
					<Board
						key={board.id}
						board={board}
						dragEndHandler={dragEndHandler}
						dragLeaveHandler={dragLeaveHandler}
						dragOverHandler={dragOverHandler}
						dragStartHandler={dragStartHandler}
						dropHandler={dropHandler}
					/>
				))}
		</Grid>
	)
}
