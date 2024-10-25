import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Kanban } from './screens/index.ts'


createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Kanban/>
	</StrictMode>
)
