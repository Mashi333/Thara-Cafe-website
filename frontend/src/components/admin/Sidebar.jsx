import React from 'react'
import './Sidebar.css'

const Sidebar = ({ page, setPage }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Thara Cafe.</h2>
        <p>Admin Panel</p>
      </div>
      <div className="sidebar-menu">
        <div
          className={`sidebar-item ${page === 'add' ? 'active' : ''}`}
          onClick={() => setPage('add')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          <p>Add Items</p>
        </div>
        <div
          className={`sidebar-item ${page === 'list' ? 'active' : ''}`}
          onClick={() => setPage('list')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
          <p>List Items</p>
        </div>
        <div
          className={`sidebar-item ${page === 'orders' ? 'active' : ''}`}
          onClick={() => setPage('orders')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <line x1="3" x2="21" y1="6" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <p>Orders</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
