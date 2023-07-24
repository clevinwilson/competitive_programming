import { Routes, Route } from 'react-router-dom';
import Register from '../pages/User/Register';

function UserRouter() {
    return (
        <Routes>
            <Route  path='/' element={<Register/>} />

        </Routes>
    )
}

export default UserRouter