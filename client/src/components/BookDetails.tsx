import { useQuery } from '@apollo/client';
import React from 'react';
import { getBookQuery } from '../queries/queries';

type BookDetailsProps = {
    activeBook: string;
};

export const BookDetails = (props: BookDetailsProps) => {
    const { loading, error, data } = useQuery(getBookQuery, {variables: { id: props.activeBook }});
    if (!data) return null;
    return (
        <>
            <h2>{data.book.name}</h2>
            <p>{data.book.genre}</p>
            <p>{data.book.author.name}</p>
            <p>Other books:</p>
            <ul className="other-books">
                {data.book.author.books.map(book => {
                    return <li key={book.id}>{book.name}</li>
                })}
            </ul>
        </>
    )
}
