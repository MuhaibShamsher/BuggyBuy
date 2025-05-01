import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct, clearSearch } from '../../store/slices/searchProduct.slice.js';

import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';


export default function SearchBox() {
    const [input, setInput] = useState('');

    const dispatch = useDispatch();

    const searchProductHandler = (e) => {
        e.preventDefault();
        dispatch(searchProduct(input));
    };

    const clearSearchHandler = () => {
        dispatch(clearSearch());
        setInput('');
    };

    return (
        <Form onSubmit={searchProductHandler} className='d-flex me-3'>
            <InputGroup>
                <Form.Control
                    size='sm'
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Search Products...'
                />
                {
                    input === '' ? (
                        ''
                    ) : (
                        <Button type='button' variant='light' onClick={clearSearchHandler}>
                            <FaTimes />
                        </Button>
                    )
                }
                <Button type='submit' variant='warning'>
                    <FaSearch />
                </Button>
            </InputGroup>
        </Form>
    );
}