
import './App.scss';
import Layout from './Layout/Layout';
import { RouterProvider } from "react-router-dom";
import { routers } from './Routers';
import { useEffect, useState } from 'react';
import BlockedScreen from './Components/BlockedScreen/BlockedScreen';
import { useDeviceMethods } from './Services/CustomHooks/useDeviceMethods';


function App() {
  const { isAccessUsingMessFBBrowser } = useDeviceMethods();
  const [isAccessByFacebookAndMessengerBrowser, setIsAccessByFacebookAndMessengerBrowser] = useState<boolean>(false);

  // Blocking user access from Messenger/Facebook Browser
  useEffect(() => {
    const isFromMessAndFB = isAccessUsingMessFBBrowser();
    setIsAccessByFacebookAndMessengerBrowser(isFromMessAndFB);
  }, []);

  return (
    <div className='app'>
      {isAccessByFacebookAndMessengerBrowser
        ? <BlockedScreen />
        : <RouterProvider router={routers} />
      }
    </div>
  );
}

export default App;
