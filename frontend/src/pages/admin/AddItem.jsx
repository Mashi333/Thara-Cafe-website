import React, { useState } from 'react'
import './AddItem.css'

const categories = ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles']

const AddItem = () => {
  const [image, setImage] = useState(null)
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('category', data.category)
    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await fetch('/api/food/add', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        alert('Item added successfully!')
        setData({ name: '', description: '', price: '', category: 'Salad' })
        setImage(null)
      } else {
        alert('Error adding item')
      }
    } catch (error) {
      alert('Error adding item')
    }
  }

  return (
    <div className="add-item">
      <form className="add-item-form" onSubmit={onSubmit}>
        <p>Upload Image</p>
        <div className="add-item-image-upload">
          <label htmlFor="image">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="preview" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            )}
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <p>Product name</p>
        <input
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          type="text"
          placeholder="Type here"
          required
        />
        <p>Product description</p>
        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Write content here"
          required
        />
        <div className="add-item-price-category">
          <div>
            <p>Product category</p>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>Product price</p>
            <input
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              type="number"
              placeholder="$20"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-item-btn">
          ADD
        </button>
      </form>
    </div>
  )
}

export default AddItem
