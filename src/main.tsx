import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Kanban } from './screens/index.ts'
import { Layout } from './shared/ui'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Layout>
			<Kanban />
		</Layout>
	</StrictMode>
)
