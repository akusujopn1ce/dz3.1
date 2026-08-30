import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Помилка спіймана ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', background: '#fee2e2', color: '#991b1b', borderRadius: '10px', marginTop: '20px' }}>
          <h2>Упс, щось пішло не так! 😢</h2>
          <p>{this.state.errorMessage}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}
          >
            Перезавантажити сторінку
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;