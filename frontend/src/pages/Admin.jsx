import React, { useState } from 'react'
import Sidebar from '../components/admin/Sidebar'
import AddItem from './admin/AddItem'
import ListItems from './admin/ListItems'
import Orders from './admin/Orders'
import './admin/Admin.css'

const Admin = () => {
  const [page, setPage] = useState('add')

  return (
    <div className="admin-app">
      <Sidebar page={page} setPage={setPage} />
      <div className="admin-content">
        {page === 'add' && <AddItem />}
        {page === 'list' && <ListItems />}
        {page === 'orders' && <Orders />}
      </div>
    </div>
  )
}

export default Admin
