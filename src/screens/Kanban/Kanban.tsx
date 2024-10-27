import { FC, memo, useEffect } from 'react'
import { Grid } from '@consta/uikit/Grid'
import { BoardColumn, LoadingOverlay } from '../../shared/ui'
import { useAppSelector, useDragNDropBoard } from '../../hook/'
import { useActions } from '../../hook/useActions'

export const Kanban: FC = memo(() => {
	const { isError, isLoading, boards } = useAppSelector((state) => state.kanban)
	const { getAll } = useActions()

	useEffect(() => {
		getAll()
	}, [getAll])

	const {
		dragEndHandler,
		dragLeaveHandler,
		dragOverHandler,
		dragStartHandler,
		dropHandler,
	} = useDragNDropBoard()

	// TODO разработать/уточнить механизм оповещения пользователя об ошибке
	if (isError) return <div>Ошибка загрузки данных</div>

	return (
		<LoadingOverlay loading={isLoading}>
			<Grid gap={'s'} cols={4} style={{ height: '100%' }}>
				{boards &&
					boards.map((board) => (
						<BoardColumn
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
		</LoadingOverlay>
	)
})
