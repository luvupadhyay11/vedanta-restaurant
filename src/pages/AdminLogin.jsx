import { useState } from 'react'
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')
    
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      if (error) throw error

      console.log('Login successful:', data)
      
      // Redirect to admin dashboard
      window.location.href = '/admindashboard'

    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            
            <h1>Admin Login</h1>
            <p>Vedanta Restaurant Management</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="login-form">
            <div className="input-group">
              <User size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <Lock size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              className="login-btn"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="login-footer">
            <p>Secure admin access only</p>
          </div>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-box {
          width: 100%;
          max-width: 450px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 48px 40px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .logo-circle {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .logo-icon {
          font-size: 40px;
        }

        .login-header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .login-header p {
          font-size: 14px;
          color: #666;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 14px;
          text-align: center;
          border: 1px solid #fcc;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f9f9f9;
          padding: 14px 16px;
          border-radius: 10px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .input-group:focus-within {
          background: white;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .input-group svg {
          color: #666;
          flex-shrink: 0;
        }

        .input-group input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 15px;
          color: #1a1a1a;
        }

        .input-group input::placeholder {
          color: #999;
        }

        .input-group input:disabled {
          opacity: 0.6;
        }

        .toggle-password {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          transition: color 0.3s ease;
        }

        .toggle-password:hover {
          color: #667eea;
        }

        .login-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          margin-top: 12px;
        }

        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .login-footer {
          text-align: center;
          margin-top: 32px;
        }

        .login-footer p {
          font-size: 13px;
          color: #999;
        }

        @media (max-width: 500px) {
          .login-box {
            padding: 36px 28px;
          }

          .login-header h1 {
            font-size: 24px;
          }

          .logo-circle {
            width: 70px;
            height: 70px;
          }

          .logo-icon {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  )
}