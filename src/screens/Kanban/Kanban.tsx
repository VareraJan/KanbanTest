import { DragEvent, FC, useState } from 'react'
import { Grid } from '@consta/uikit/Grid'
import { Board, IBoard, ICard } from '../../shared/ui'
import { useBoard, useDragNDropBoard } from '../../hook/'

export const Kanban: FC = () => {
	const { boards, setBoards, isError, isLoading } = useBoard()

	const {
		dragEndHandler,
		dragLeaveHandler,
		dragOverHandler,
		dragStartHandler,
		dropHandler,
	} = useDragNDropBoard({ boards, setBoards })

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
