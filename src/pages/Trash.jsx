import React from 'react';
import Navbar from "../components/Navbar/Navbar.jsx";
import Table from "../components/common/Table.jsx";
import {useGetTrashedCardsQuery} from "../features/cards/cardsApi.js";

const Trash = () => {
    const { data, isLoading, isError } = useGetTrashedCardsQuery(undefined, {refetchOnMountOrArgChange:true});
    let content = null;
    if (isLoading) content = <div>Loading...</div>;
    if (!isLoading && isError) content = <div>smething went wrong</div>;
    if (!isLoading && !isError && data) {
        const cards = data.data;
        content = <Table cards={cards} listType='trash' />
    }
    return (
        <div className='min-h-screen bg-[#F7F7F8]'>
            <Navbar/>
            <div className='py-10'>
                <div className='sm:px-6'>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Trash;