import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import { BookDetails } from './BookDetails';

type BookListProps = {};

export const BookList = (props: BookListProps) => {
    const [activeBook, setActiveBook] = useState<string | null>(null);
    const { loading, error, data } = useQuery(getBooksQuery);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error : {JSON.stringify(error)}</p>
    return (
        <div>
            <ul id="book-list">
                {data.books.map(({name, id}: {name: string; id: string}) => {
                    return <li key={id} onClick={e => setActiveBook(id)}>{name}</li>
                })}
            </ul>
            {activeBook && <div id="book-details">
                <BookDetails activeBook={activeBook}/>
            </div>}
        </div>
    )
}