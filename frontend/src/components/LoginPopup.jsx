import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import './LoginPopup.css'

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState('Login')
  const [data, setData] = useState({ name: '', email: '', password: '' })
  const { url, setToken, loadCartData } = useContext(StoreContext)

  const onChangeHandler = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register'
    const body = currState === 'Login' ? { email: data.email, password: data.password } : data
    try {
      const response = await fetch(`${url}${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      const result = await response.json()
      if (result.success) {
        setToken(result.token)
        localStorage.setItem('token', result.token)
        loadCartData(result.token)
        setShowLogin(false)
      } else {
        alert(result.message)
      }
    } catch (error) { alert('Something went wrong') }
  }

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <svg onClick={() => setShowLogin(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ cursor: 'pointer' }}>
            <line x1="18" x2="6" y1="6" y2="18" /><line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </div>
        <form onSubmit={onSubmit} className="login-popup-inputs">
          {currState === 'Sign Up' && <input name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder="Your name" required />}
          <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Your email" required />
          <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder="Your password" required />
          <button type="submit">{currState === 'Login' ? 'Login' : 'Create account'}</button>
        </form>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        )}
      </div>
    </div>
  )
}

export default LoginPopup
