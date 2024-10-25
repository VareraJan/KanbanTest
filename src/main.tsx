import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Kanban } from './screens/index.ts'
import { Layout } from './shared/ui'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<Layout>
				<Kanban />
			</Layout>
		</Provider>
	</StrictMode>
)
