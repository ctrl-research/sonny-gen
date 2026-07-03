import { Stage } from './scene/Stage';
import { Sidebar } from './components/Sidebar';

export default function App() {
  return (
    <div className="app">
      <main className="viewport">
        <Stage />
      </main>
      <Sidebar />
    </div>
  );
}
