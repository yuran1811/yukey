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
          className="flexcentercol h-screen"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div
            data-tauri-drag-region
            className="flexcentercol flex-1 gap-5 rounded-t-lg border-x-2 border-t-2 border-red-400 bg-red-400/25 px-8 py-6"
          >
            <h1 className="pointer-events-none text-white">
              Sorry.. there was an error
            </h1>
            <div className="flexcenter gap-3">
              <button
                className="rounded-lg border-2 border-red-400 px-2 py-1 text-red-400 transition-colors hover:bg-red-400/20 hover:text-white"
                onClick={() => appWindow.close()}
              >
                Close
              </button>
              <button
                className="rounded-lg border-2 border-blue-700 bg-blue-700/50 px-2 py-1 text-white transition-colors hover:bg-blue-700/90"
                onClick={() => window.location.reload()}
              >
                Reload
              </button>
            </div>
          </div>

          <div
            data-tauri-drag-region
            className="w-full flex-1 rounded-b-lg border-x-2 border-b-2 border-red-400 bg-error-gif bg-cover bg-fixed"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
