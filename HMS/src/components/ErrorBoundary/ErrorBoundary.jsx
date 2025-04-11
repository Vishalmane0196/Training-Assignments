// src/components/ErrorBoundary.jsx
import React from 'react';
import errorBoundaryCSS from  'src/style/Error.module.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI can be rendered
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log error to an external service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom fallback UI here
      return (
        <div className={errorBoundaryCSS.errorBox}>
          <h2 className={errorBoundaryCSS.errorTitle}>Oops! Something went wrong.</h2>
          <p>{this.state.error?.message || "Unknown error occurred."}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
