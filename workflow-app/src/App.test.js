import { render, screen } from '@testing-library/react'
import App from './App'

test('shows the login page by default', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})
