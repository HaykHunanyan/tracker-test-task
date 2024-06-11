import React, { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { API_ROOT } from './configs/env-vars'

declare global {
    interface Window {
        tracker?: {
            track: (...args: any[]) => void
        }
    }
}

const App: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const script = document.createElement('script')
        script.src = `${API_ROOT}/tracker`
        script.async = true
        document.head.appendChild(script)

        script.onload = () => {
            if (window.tracker) {
                window.tracker.track('pageview')
                window.tracker.track('test', 'one', 'two', 'three')
            }
        }

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    const handleClick = async (
        event: React.MouseEvent<HTMLAnchorElement>,
        type: string,
        path: string
    ) => {
        event.preventDefault()
        if (window.tracker) {
            await window.tracker.track(type, path)
            navigate(path)
        }
    }
    return (
        <div>
            <button
                id="trackButton"
                onClick={() =>
                    window.tracker && window.tracker.track('click-button')
                }
            >
                Click me
            </button>
            <ul>
                <li>
                    <Link
                        to="/1"
                        onClick={e => handleClick(e, 'click-link', '1')}
                    >
                        1.html
                    </Link>
                </li>
                <li>
                    <Link
                        to="/2"
                        onClick={e => handleClick(e, 'click-link', '2')}
                    >
                        2.html
                    </Link>
                </li>
                <li>
                    <Link
                        to="/3"
                        onClick={e => handleClick(e, 'click-link', '3')}
                    >
                        3.html
                    </Link>
                </li>
            </ul>
            <Routes>
                <Route path="/1" element={<div>Content for 1.html</div>} />
                <Route path="/2" element={<div>Content for 2.html</div>} />
                <Route path="/3" element={<div>Content for 3.html</div>} />
            </Routes>
        </div>
    )
}

export default App
