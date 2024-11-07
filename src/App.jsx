import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal/Modal.jsx';
import LoadingDots from './components/Skeletons/LoadingDots';
import ModalsContainer from './components/ui/ModalsContainer.jsx';
import useAuthCheck from './hooks/UseAuthCheck';
import { router } from './routes/root';

function App() {
  const authCheck = useAuthCheck();
  if (!authCheck) {
    return <LoadingDots />;
  }
  return (
    <>
      <RouterProvider router={router} />
      <Modal />
      <ToastContainer
        position='bottom-left'
        theme='light'
        transition={Flip}
        autoClose={4000}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        closeButton={false}
      />
      <ModalsContainer />
    </>
  );
}

export default App;
