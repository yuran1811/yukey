import { appWindow } from '@tauri-apps/api/window';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError({ message }: Error): State {
    console.log(message);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          data-tauri-drag-region
          className="flexcentercol gap-5 rounded-lg border-2 border-red-400 bg-red-400/20 px-8 py-6"
          onContextMenu={(e) => e.preventDefault()}
        >
          <h1 className="pointer-events-none text-white">
            Sorry.. there was an error
          </h1>
          <button
            className="rounded-lg border-2 border-red-400 px-2 py-1 text-red-400 transition-colors hover:bg-red-400/20 hover:text-white"
            onClick={() => appWindow.close()}
          >
            Close
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
