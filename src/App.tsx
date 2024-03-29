
import './App.scss';
import Layout from './Layout/Layout';
import { RouterProvider } from "react-router-dom";
import { routers } from './Routers';


function App() {

  return (
    <div className='app'>
      <RouterProvider router={routers} />
    </div>
  );
}

export default App;
