
interface SpinnerProps {
    size?: number;
    color?: string;
  }
  
  const Spinner: React.FC<SpinnerProps> = ({ size = 16, color = 'text-blue-500' }) => {
    return (
        <div style={{ height: '89.3vh'}}>
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <svg className={`animate-spin h-${size} w-${size} ${color}`} viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 0112 4V0C6.486 0 2 4.486 2 10h4zm5.703 1.693A8.02 8.02 0 0112 20V24c4.411 0 8-3.589 8-8h-4zm2.797-7.497A8.03 8.03 0 0120 12h4c0-4.411-3.589-8-8-8v4z"
          />
        </svg>
      </div>
      </div>
    );
  };
  
  export default Spinner;