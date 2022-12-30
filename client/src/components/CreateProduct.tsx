import axios from "axios"
import { useState } from "react"
import { IProduct } from "../models"
import { ErrorMessage } from "./ErrorMessage"

const productData: IProduct = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic',
    rating: {
        rate: 42,
        count: 10
    }
}

interface CreateProductsProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductsProps) {

    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (value.trim().length === 0) {
            // TODO: Replace magic string
            setError('Please enter a valid title.')
            return;
        }
        
        setSubmitting(true);
        
        productData.title = value;
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData);
        onCreate(response.data);
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return(
        <form onSubmit={ submitHandler }>
            <input 
                type="text" 
                className="border py-2 px-4 mb-2 w-full outline-0"
                placeholder="Enter product title..."
                value={ value }
                onChange={ changeHandler }
            />
            
            { error && <ErrorMessage error={ error } /> }
            
            { !submitting &&
            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button> }

            { submitting &&
            <p>Loading...</p> }
        </form>
    )
}