import { useState } from 'react';
import { stringToFormattedDate } from '../../lib/dateFormatter.js';

const AddOrdersModal = ({ data, setData, addCards, isLoading }) => {
  const { orderInfo, totalCards } = data || {};
  const [selectedCards, setSelectedCards] = useState(totalCards);

  const handleCloseModal = () => {
    setData(null);
    setSelectedCards([]);
    document.getElementById('ordersAddModal').close();
  };

  const handleOnchange = (e, card) => {
    if (e.target.checked) {
      setSelectedCards((selectedCards) => {
        return [...selectedCards, card];
      });
    } else {
      setSelectedCards((selectedCards) => {
        return selectedCards.filter((c) => {
          return c.cardNumber !== card.cardNumber;
        });
      });
    }
  };
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCards(totalCards);
    } else {
      setSelectedCards([]);
    }
  };
  const handleSubmit = () => {
    if (orderInfo && selectedCards.length > 0) {
      addCards({ orderInfo, cards: selectedCards });
      setData(null);
      setSelectedCards([]);
    }
  };

  return (
    <>
      <form method='dialog' dir='rtl' onSubmit={handleSubmit}>
        <div className='flex justify-between'>
          <h3 className='text-[#2E2C34] font-semibold text-[28px]'>
            {totalCards[0]['client']['name']}
          </h3>
          <span
            onClick={handleCloseModal}
            className='btn btn-sm btn-circle btn-ghost text-xl text-[#84818A] '
          >
            ✕
          </span>
        </div>
        <hr className='h-px my-8 bg-gray-200 border-0 mt-8'></hr>
        <div className='flex gap-3 mb-8'>
          {/*<img src={detailsIcon} alt="details"/>*/}
          <span className='text-sm font-semibold'>פרטים</span>
        </div>

        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      onChange={handleSelectAll}
                      checked={totalCards.length === selectedCards.length}
                      type='checkbox'
                      className='checkbox'
                    />
                  </label>
                </th>
                <th>מספר הזמנה</th>
                <th>סוג</th>
                <th>מזהה</th>
                <th>⁠דדליין</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {totalCards &&
                totalCards.map((card, idx) => (
                  <tr key={idx}>
                    <th>
                      <label>
                        <input
                          checked={selectedCards.includes(card)}
                          onChange={(e) => handleOnchange(e, card)}
                          type='checkbox'
                          className='checkbox'
                        />
                      </label>
                    </th>
                    <td>
                      <div className='flex items-center gap-3'>
                        <span>{card?.cardNumber}</span>
                      </div>
                    </td>
                    <td>
                      <span className='badge badge-ghost badge-sm'>
                        {card.type.name}
                      </span>
                    </td>
                    <td>{card.type.typeID}</td>
                    <td>
                      <span>
                        {card.dueDate
                          ? stringToFormattedDate(card.dueDate)
                          : ''}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='rtl:text-left'>
          <button
            disabled={isLoading || selectedCards?.length === 0}
            className='btn px-12 btn-primary text-white text-sm font-semibold drawer-button'
            type='submit'
          >
            שמור שינויים
          </button>
        </div>
      </form>
    </>
  );
};

export default AddOrdersModal;
