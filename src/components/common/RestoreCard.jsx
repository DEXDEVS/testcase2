import React from 'react';
import {useRestoreCardFromArchiveMutation, useRestoreCardFromTrashMutation} from "../../features/cards/cardsApi.js";
import restoreIcon from "../../assets/icons/restore.png";

const RestoreCard = ({id, listType}) => {
    const [restoreFromTrash, { isLoading }] =
        useRestoreCardFromTrashMutation();
    const [restoreFromArchive, { isLoading:archiveIsLoading  }] =
        useRestoreCardFromArchiveMutation();
    const handleOnclick = (id) => {
        if (id) {
            if (listType==='trash'){
                restoreFromTrash(id);
            }
            else {
                restoreFromArchive(id)
            }
        }
    };
    return (
        <button
            disabled={isLoading || archiveIsLoading}
            onClick={() => handleOnclick(id)}
            className='cursor-pointer w-7 h-7'
        >
            <img className='w-full h-full' src={restoreIcon} alt='edit icon' />
        </button>
    );
};

export default RestoreCard;