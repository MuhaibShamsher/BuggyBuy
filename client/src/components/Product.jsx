import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cart.slice.js'
import addCurrency from '../utilis/currency.utilis.js'
import Rating from './Rating.jsx'
import { Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function Product({ product }) {
    const qty = 1;
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        toast.success('Added to Cart');
    };

    return (
        <Card className='my-3 p-3 rounded text-center'>
            <Link
                to={`/product/${product._id}`}
                className='text-decoration-none text-dark'
            >
                <Card.Img
                    variant='top'
                    src={product.image}
                    style={{ height: '200px', objectFit: 'contain' }}
                />
                <Card.Body>
                    <Card.Title as='div' className='product-title'>
                        <strong>{product.name}</strong>
                    </Card.Title>

                    <Card.Text as='div' className='mb-3'>
                        <Rating
                            value={product.rating}
                            text={`(${product.numReviews} reviews)`}
                        />
                    </Card.Text>
                    <Card.Text as='h3'>{addCurrency(product.price)}</Card.Text>
                </Card.Body>
            </Link>
            <Button
                variant='warning'
                type='button'
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
            >
                Add To Cart
            </Button>
        </Card>
    );
}