import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

export default function ProductFormPage() {
  const { id: productId } = useParams();
  const isUpdateMode = !!productId;

  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (isUpdateMode) {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/v1/products/${productId}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setName(data.name);
        setDescription(data.description);
        setBrand(data.brand);
        setCategory(data.category);
        setPrice(data.price);
        setCountInStock(data.countInStock);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [isUpdateMode, productId])

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('countInStock', countInStock);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      setLoading(true);
      const res = await fetch(
        isUpdateMode
          ? `http://localhost:5000/api/v1/products/${productId}`
          : 'http://localhost:5000/api/v1/products',
        {
          method: 'POST',
          body: formData
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to save product');
      toast.success(data.message);

      setName("")
      setImageFile(null)
      setDescription("")
      setBrand("")
      setCategory("")
      setPrice("")
      setCountInStock("")
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      {error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <FormContainer>
          <div className='shadow p-4 rounded bg-light my-5'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h2 className='mb-0 fw-bold text-primary'>
                {isUpdateMode ? 'Update Product' : 'Create Product'}
              </h2>
              <Link to='/admin/product-list' className='btn btn-outline-secondary'>
                ← Back to Products
              </Link>
            </div>

            <Form onSubmit={submitHandler} encType='multipart/form-data'>
              <Form.Group controlId='name' className='mb-3'>
                <Form.Label className='fw-semibold'>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter product name'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='price' className='mb-3'>
                <Form.Label className='fw-semibold'>Price ($)</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter price'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='image' className='mb-3'>
                <Form.Label className='fw-semibold'>Image</Form.Label>
                <Form.Control
                  type='file'
                  onChange={e => setImageFile(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group controlId='brand' className='mb-3'>
                <Form.Label className='fw-semibold'>Brand</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter brand'
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='countInStock' className='mb-3'>
                <Form.Label className='fw-semibold'>Stock Quantity</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter quantity in stock'
                  value={countInStock}
                  onChange={e => setCountInStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='category' className='mb-3'>
                <Form.Label className='fw-semibold'>Category</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId='description' className='mb-4'>
                <Form.Label className='fw-semibold'>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Enter product description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Form.Group>

              <div className='d-grid'>
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='rounded-pill'
                >
                  {isUpdateMode ? 'Update Product' : 'Create Product'}
                </Button>
              </div>
            </Form>
          </div>
        </FormContainer>
      )
      }
    </>
  )
}