import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'
import './styles/index.css'

// vite-react-ssg pre-renders every static route in `routes` to HTML at build time.
export const createRoot = ViteReactSSG({ routes })
