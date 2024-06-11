import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

const App: React.FC = () => {
    const navigate = useNavigate()

    const handleClick = async (
        event: React.MouseEvent<HTMLAnchorElement>,
        type: string,
        path: string
    ) => {
        event.preventDefault()
        console.log(path, 'path')
        navigate(path)
    }

    return (
        <div>
            <button id="trackButton">Click me</button>
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
