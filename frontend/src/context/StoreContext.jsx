import { createContext, useState, useEffect } from 'react'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([])
  const [cartItems, setCartItems] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const url = ''

  const loadCartData = async (token) => {
    try {
      const response = await fetch(`${url}/api/cart/get`, {
        headers: { token },
      })
      const data = await response.json()
      if (data.success) {
        setCartItems(data.data)
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    }
  }

  const loadFoodData = async () => {
    try {
      const response = await fetch(`${url}/api/food/list`)
      const data = await response.json()
      if (data.success) {
        setFoodList(data.data)
      }
    } catch (error) {
      console.error('Error loading food:', error)
    }
  }

  useEffect(() => {
    loadFoodData()
    if (token) {
      loadCartData(token)
    }
  }, [])

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
    if (token) {
      await fetch(`${url}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ itemId }),
      })
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
    if (token) {
      await fetch(`${url}/api/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify({ itemId }),
      })
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = foodList.find((product) => product._id === item)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item]
        }
      }
    }
    return totalAmount
  }

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export { StoreContextProvider }
export default StoreContextProvider
