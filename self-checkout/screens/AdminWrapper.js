import React, { useState } from 'react'
import Admin from '../screens/Admin'
import AddnewProduct from './AddnewProduct'
const AdminWrapper = props => {

    const [isAdmin, setIsAdmin] = useState(true)

    return (
        <>
            {isAdmin ? <Admin setIsAdmin={setIsAdmin} /> : <AddnewProduct setIsAdmin={setIsAdmin} />}
        </>
    )
}

export default AdminWrapper