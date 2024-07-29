import React, { useEffect, useState } from 'react';
import { useAddCardsMutation } from '../../features/cards/cardsApi.js';
import AddOrdersModal from '../AddOrdersModal/AddOrdersModal.jsx';
import UpLoadDropZone from './UpLoadDropZone.jsx';

const UploadFileReact = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [addCards, { isLoading, isError, isSuccess }] = useAddCardsMutation();

  useEffect(() => {
    if (data) {
      if (data.totalCards?.length > 1) {
        document.getElementById('ordersAddModal').showModal();
        setFile(null);
      } else if (data.totalCards?.length === 1) {
        addCards({ orderInfo: data.orderInfo, cards: data.totalCards });
        setFile(null);
        setData(null);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      document.getElementById('loadingModal').showModal();
    }
  }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      document.getElementById('loadingModal').close();
      document.getElementById('successModal').showModal();
      setData(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      document.getElementById('loadingModal').close();
      document.getElementById('ErrorModal').showModal();
      setData(null);
    }
  }, [isError]);

  return (
    <>
      <div className='dropdown dropdown-end relative'>
        <UpLoadDropZone setData={setData} file={file} setFile={setFile} />

        {data && data.totalCards?.length > 1 && (
          <dialog id='ordersAddModal' className='modal' dir='rtl'>
            <div className='modal-box max-w-3xl p-12'>
              {/* if there is a button in form, it will close the modal */}
              <AddOrdersModal
                data={data}
                setData={setData}
                addCards={addCards}
                isLoading={isLoading}
              />
            </div>
          </dialog>
        )}
      </div>
    </>
  );
};

export default UploadFileReact;
