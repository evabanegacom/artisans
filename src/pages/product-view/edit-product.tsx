
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductService from '../../services/product-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../constants/Loader';
import categories from '../../constants/categories';
import { Navigate, useParams } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

const EditProduct: React.FC = () => {
    const { id } = useParams();
    const user = useSelector((state: any) => state?.reducer?.auth?.user);
    const [loading, setLoading] = useState(false);
    const [productDetail, setProductDetail] = useState<any>({});

    const [formData, setFormData] = useState<any>({
        name: productDetail?.name || '',
        description: productDetail?.description || '',
        price: productDetail?.price || '',
        category: productDetail?.category || '',
        quantity: productDetail?.quantity || '',
        sold_by: user?.store_name || '',
        contact_number: user?.mobile || '',
        product_number: productDetail?.product_number || '',
        pictureOne: '',
        pictureTwo: '',
        pictureThree: '',
        pictureFour: '',
        tags: ['beauty'],
        user_id: user?.id
    });
    

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const file = e.target.files && e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
        const maxSize = 1024 * 1024; // 1 megabyte

        if (file && !allowedTypes.includes(file.type)) {
            toast.error("Please select a valid image file (JPEG, JPG, PNG, SVG).");
            e.target.value = ''; // Clear the input
            return;
        }

        if (file && file.size > maxSize) {
            toast.error("The selected image file is too large. Please select an image file under 1 megabyte.");
            e.target.value = '';
            return;
        }

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, [name]: file }); // Store the file itself, not its data URL
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [name]: '' });
        }
    };
    

    const getProduct = async () => {
        try {
            const product = await ProductService.getProduct(id as string);
            setProductDetail(product?.data as any);
            setFormData({
                name: product?.data?.name,
                description: product?.data?.description,
                price: product?.data?.price,
                category: product?.data?.category,
                quantity: product?.data?.quantity,
                sold_by: user?.store_name,
                contact_number: user?.mobile,
                product_number: product?.data?.product_number,
                tags: product?.data?.tags,
                user_id: user?.id
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tagsValue = e.target.value;
        setFormData({ ...formData, tags: tagsValue.split(',').map(tag => tag.trim()) });
    };

    

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Fetch the existing product data
            const existingProduct = await ProductService.getProduct(id as any);
            const existingTags = existingProduct.data.tags;

            // Merge the existing tags with the new tags
            const updatedTags = [...existingTags, ...formData.tags];

            const productData: any = new FormData();

            // Append all form data except file inputs
            Object.entries(formData).forEach(([key, value]: [string, any]) => {
                if (key !== 'tags' && (typeof value !== 'object' || value instanceof File)) {
                    productData.append(key, value);
                }
            });

            // Append updated tags
            updatedTags.forEach(tag => {
                productData.append('tags[]', tag);
            });

            // Append file inputs
            for (const [name, file] of Object.entries(formData)) {
                if (file instanceof File) {
                    productData.append(name, file);
                }else if(file === '') {
                    productData.append(name, '');
                }
            }

            await ProductService.updateProduct(productData, productDetail?.id as any);
            toast.success('Product updated successfully');
            getProduct();
        } catch (error) {
            toast.error('Error updating product');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteImage = (indexToDelete: number) => {
        // If indexToDelete is 0 (pictureOne), do nothing
        if (indexToDelete === 0) {
            return;
        }
    
        const updatedFormData = { ...formData };
    
        // Remove the image data corresponding to the indexToDelete
        switch (indexToDelete) {
            case 1:
                updatedFormData.pictureTwo = '';
                break;
            case 2:
                updatedFormData.pictureThree = '';
                break;
            case 3:
                updatedFormData.pictureFour = '';
                break;
            default:
                break;
        }
    
        // Update the state with the modified formData
        setFormData(updatedFormData);
    };
    
    

    // const handleDeleteImage = async (index: number) => {
    //     try {
    //         // Make a copy of the image_urls array
    //         if(productDetail?.image_urls.length === 1) {
    //             toast.error('You cannot delete the only image of a product');
    //             return;
    //         }

    //         if(index === 0) {
    //            setFormData((prevFormData: any) => ({ ...prevFormData, pictureOne: '' }));
    //         }else if(index === 1) {
    //             setFormData((prevFormData: any) => ({ ...prevFormData, pictureTwo: '' }));
    //         }else if(index === 2) {
    //             setFormData((prevFormData: any) => ({ ...prevFormData, pictureThree: '' }));
    //         }else if(index === 3) {
    //             setFormData((prevFormData: any) => ({ ...prevFormData, pictureFour: '' }));
    //         }

    //         await ProductService.updateProduct(productDetail?.id as any, productDetail?.id as any);
    //         getProduct();
    //         toast.success('Image deleted successfully');
    //     } catch (error) {
    //         // Handle errors appropriately
    //         console.error('Error deleting image:', error);
    //         toast.error('Error deleting image');
    //     }
    // };
    

    const handleRemoveTag = async (tagToRemove: string) => {
        // Filter out the tag to remove from the tags state
        const updatedTags = productDetail?.tags?.filter((tag: string) => tag !== tagToRemove);

        // Update the formData state with the updated tags
        setFormData((prevFormData: any) => ({ ...prevFormData, tags: updatedTags }));

        try {
            // Call ProductService.updateProduct with the updated formData
            const updatedFormData = { ...formData, tags: updatedTags || [] }; // Ensure tags property is always included
            await ProductService.updateProduct(updatedFormData, productDetail?.id as any);
            getProduct();
        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error appropriately, such as displaying an error message to the user
        }
    };

    if (!user) {
        return <Navigate to='/login' />;
    }

    return (
        <>
            {productDetail && productDetail?.name ?
                <div className='bg-gray-200 py-3'>
                    <h1 className='text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3'>Edit</h1>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Product Name:
                            </label>
                            <input type="text" name="name" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-gray-400 leading-tight focus:outline-none focus:shadow-outline" placeholder={productDetail?.name} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description:
                            </label>
                            <textarea name="description" placeholder={productDetail?.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-400 focus:outline-none focus:shadow-outline"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price:
                            </label>
                            <input type="number" name="price" placeholder={productDetail?.price} onChange={handleChange} className="shadow appearance-none border placeholder-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                Category:
                            </label>
                            <select name="category" value={formData?.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">{productDetail?.category}</option>
                                {categories.map(category => (
                                    <option key={category?.id} value={category?.name}>
                                        {category?.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
                                Quantity:
                            </label>
                            <input type="number" placeholder={productDetail?.quantity} name="quantity" onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                                Tags:
                            </label>
                            <input
                                placeholder={
                                    productDetail?.tags.length > 0
                                        ? [...new Set(productDetail?.tags)].join(', ')
                                        : 'no tags'
                                }
                                type="text"
                                name="tags"
                                onChange={handleTagsChange}
                                className="placeholder-gray-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <small className="text-gray-500">Enter 5 tags separated by commas</small>
                            <div className='flex flex-wrap gap-2 items-center mt-1'>
                                {[...new Set(productDetail?.tags)]?.map((tag: any) => (
                                    <div className='flex gap-1 items-center bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-bold mr-1'>
                                        <span key={tag}>{tag}</span>
                                        <FaTimes className="text-red-500" onClick={() => handleRemoveTag(tag)} cursor='pointer' />
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureOne">
                                Product Image:
                            </label>
                            <input type="file" name="pictureOne" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {productDetail?.image_urls[0] && <img src={productDetail?.image_urls[0]} alt={productDetail?.name} className="object-cover object-center w-full h-full block transition duration-300 ease-in-out " />}
                            {productDetail?.image_urls[0] && <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteImage(0)}><AiFillDelete /></button>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureTwo">
                                More(Optional):
                            </label>
                            <input type="file" name="pictureTwo" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {productDetail?.image_urls[1] && <img src={productDetail?.image_urls[1]} alt={productDetail?.name} className="object-cover object-center w-full h-full block transition duration-300 ease-in-out " />}
                            {productDetail?.image_urls[1] && <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteImage(1)}><AiFillDelete /></button>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureThree">
                                More(Optional):
                            </label>
                            <input type="file" name="pictureThree" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {productDetail?.image_urls[2] && <img src={productDetail?.image_urls[2]} alt={productDetail?.name} className="object-cover object-center w-full h-full block transition duration-300 ease-in-out " />}
                            {productDetail?.image_urls[2] && <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteImage(2)}><AiFillDelete /></button>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureFour">
                                More(Optional):
                            </label>
                            <input type="file" name="pictureFour" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {productDetail?.image_urls[3] && <img src={productDetail?.image_urls[3]} alt={productDetail?.name} className="object-cover object-center w-full h-full block transition duration-300 ease-in-out " />}
                            {productDetail?.image_urls[3] && <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteImage(3)}><AiFillDelete /></button>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_number">
                                Contact Number:
                            </label>
                            <input type="text" placeholder={productDetail?.contact_number} name="contact_number" onChange={handleChange} className="shadow placeholder-gray-400 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>

                        <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
                            {loading ? <Loader /> : 'Submit'} </button>
                    </form>
                </div>
                : null}
        </>
    );
};

export default EditProduct;
``

