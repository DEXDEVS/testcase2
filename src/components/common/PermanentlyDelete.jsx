import React from 'react';
import TrashIcon from "../../assets/icons/trash-icon.svg";
import {useDeleteCardMutation } from "../../features/cards/cardsApi.js";

const PermanentlyDelete = ({id}) => {
    const [deleteCard, { isLoading }] = useDeleteCardMutation();
    const handleOnclick = (id) => {
       deleteCard(id);
    };
    return (
        <button
            disabled={isLoading}
            onClick={() => handleOnclick(id)}
            className='cursor-pointer w-7 h-7'
        >
            <img className='w-full h-full' src={TrashIcon} alt='edit icon'/>
        </button>
    );
};

export default PermanentlyDelete;