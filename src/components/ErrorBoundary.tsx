import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { Component, ErrorInfo, ReactNode } from 'react';

const appWindow = getCurrentWebviewWindow();

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
          className="flexcentercol h-screen *:w-full *:flex-1 **:pointer-events-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="flexcentercol gap-5 rounded-t-lg border-x-2 border-t-2 border-red-400 bg-red-400/25 px-8 py-6">
            <h1 className="text-white">Sorry... there was an error</h1>
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

          <div className="bg-error-gif rounded-b-lg border-x-2 border-b-2 border-red-400 bg-cover bg-fixed" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
