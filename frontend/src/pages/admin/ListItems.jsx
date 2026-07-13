import React, { useEffect, useState } from 'react'
import './ListItems.css'

const ListItems = () => {
  const [items, setItems] = useState([])
  const url = ''

  const fetchItems = async () => {
    try {
      const response = await fetch(`${url}/api/food/list`)
      const data = await response.json()
      if (data.success) {
        setItems(data.data)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  const removeItem = async (id) => {
    try {
      const response = await fetch(`${url}/api/food/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      if (data.success) {
        fetchItems()
      } else {
        alert('Error removing item')
      }
    } catch (error) {
      alert('Error removing item')
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="list-items">
      <h2>All Food Items</h2>
      <div className="list-items-table">
        <div className="list-items-table-header">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        <hr />
        {items.map((item) => (
          <div key={item._id} className="list-items-table-row">
            <img src={`${url}${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className="remove-btn" onClick={() => removeItem(item._id)}>
              &times;
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListItems
