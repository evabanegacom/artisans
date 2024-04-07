import { useEffect, useState } from 'react';
import ProductService from './services/product-service';

const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [foundProducts, setFoundProducts] = useState([]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const searchProducts = async (e:any) => {
        e.preventDefault();
        try {
            const response = await ProductService.searchProducts(searchTerm);
            setFoundProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    return { searchTerm, handleSearch, setSearchTerm, searchProducts, foundProducts };
    };

export default useSearch;