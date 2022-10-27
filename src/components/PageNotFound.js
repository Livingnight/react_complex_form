import React from "react"
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  )
}

export { PageNotFound as default }
