import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

type AddBookProps = {};

export const AddBook = (props: AddBookProps) => {
    const initialState = {
        name: "",
        genre: "",
        authorId: ""
    }
    const [formState, setFormState] = useState(initialState);
    const { loading, error, data } = useQuery(getAuthorsQuery);
    const [addBook, { data: mutData }] = useMutation(addBookMutation);
    if (error) return <p>Error : {JSON.stringify(error)}</p>

    const submitForm = e => {
        e.preventDefault();
        addBook({
            variables: formState,
            refetchQueries: [{
                query: getBooksQuery
            }]
        })
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={e => {
                    setFormState({
                        ...formState,
                        name: e.target.value
                    })
                }}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={e => {
                    setFormState({
                        ...formState,
                        genre: e.target.value
                    })
                }}/>
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={e => {
                    setFormState({
                        ...formState,
                        authorId: e.target.value
                    })
                }}>
                    <option>Select Author</option>
                    {loading && <option disabled={true}>Loading Authors...</option>}
                    {!loading && data.authors.map(author => {
                        return <option key={author.id} value={author.id}>{author.name}</option>
                    })}
                </select>
            </div>

            <button>+</button>

        </form>
    )
}