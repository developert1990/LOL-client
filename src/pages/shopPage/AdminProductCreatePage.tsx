import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProduct } from '../../actions/productAction';
import { Loading } from '../../components/Loading';
import { MessageBox } from '../../components/MessageBox';
import { initialAppStateType } from '../../store';

import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { PRODUCT_CREATE_FINISH } from '../../constants/productConstants';

export const AdminProductCreatePage = () => {

    const productCreateStoreInfo = useSelector((state: initialAppStateType) => state.productCreateStore);
    const { error, loading, reDirectUrl } = productCreateStoreInfo;



    const dispatch = useDispatch();
    const history = useHistory();
    const [postFormData, setPostFormData] = useState(new FormData());
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<string>('Clothes');
    const [countInStock, setCountInStock] = useState<number>(0);
    const [brand, setbrand] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [created, setCreated] = useState<boolean>(false);

    const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
    const [errorUpload, setErrorUpload] = useState<string>('');
    const textareaRow = 3;

    console.log('category: ', category)

    const createProductHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = { name, price, image, category, brand, countInStock, description };
        postFormData.append('createProduct', JSON.stringify(formData));
        dispatch(createProduct(postFormData));
        setCreated(true);
    }


    // ---------------------------------------------------------------------------------------------

    const thumbsContainer: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
    };

    const thumb: React.CSSProperties = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
    };




    const [files, setFiles] = useState<FileWithPath[]>([]);


    const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
    };

    const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
    };

    const imageUploadHandler = async (fileName: any) => {
        if (fileName) {
            console.log('fileName은 : ', fileName)
            const file = fileName[0]
            console.log('file', file)
            postFormData.append('image', file); // bodyFormData를 설정해야지 multer에서 읽을 수 잇는 것같음 잘 모르겟다. correct

        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            imageUploadHandler(acceptedFiles.map(file => file));
        },

    });

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(URL.createObjectURL(file)));
    }, [files]);

    useEffect(() => {
        if (reDirectUrl.length > 0) {
            history.push(`${reDirectUrl}`)
            dispatch({ type: PRODUCT_CREATE_FINISH })
        }
    }, [dispatch, history, reDirectUrl])


    const thumbs: React.ReactNode = files.map(file => (
        <div style={thumb} key={file.name}>

            <div style={thumbInner}>
                <img src={URL.createObjectURL(file)} style={img} alt={file.name} />
            </div>
        </div>
    ));


    // -------------------------------------------------------------------------------------



    return (
        <div className="productCreateScreen">
            <form onSubmit={createProductHandler} className="form">
                <div className="form__title">

                    <h1>Create Product</h1>
                </div>
                {
                    loading ? <Loading /> :
                        error ? <MessageBox variant="danger">{error}</MessageBox> :
                            (
                                <div className="form__base">

                                    <div>
                                        <input className="form__input" type="text" id="name" placeholder="Enter name" value={name}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="label">Price</label>
                                        <input className="form__input" type="text" id="name" placeholder="Enter price" value={price}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))} />
                                    </div>

                                    <div>
                                        <input className="form__input" type="text" id="image" placeholder="Click image button below" value={image}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.value)} disabled={true} />
                                    </div>

                                    <div>
                                        <div className="dropzone dropzon__outline">
                                            <section className="container">
                                                <div {...getRootProps({ className: 'dropzone dropzon__innerline' })}>
                                                    <input {...getInputProps()} />
                                                    <AddPhotoAlternate className="addPhoto" />
                                                </div>
                                            </section>
                                        </div>
                                        <div className="image__detail">
                                            <div style={thumbsContainer}>
                                                {thumbs}
                                            </div>
                                            {files.map(f => (
                                                <div className="image__nameSize">
                                                    <li key={f.name}>{f.name}</li>
                                                    <li> {f.size} bytes</li>
                                                </div>

                                            ))}
                                        </div>
                                        {loadingUpload && <Loading />}
                                        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                    </div>

                                    <div>
                                        <input className="form__input" type="text" id="brand" placeholder="Enter brand" value={brand}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setbrand(e.target.value)} />
                                    </div>
                                    <select className="form__input" name="Category" id="" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}>
                                        <option value="Clothes">Clothes</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Figure">Figure</option>
                                        <option value="Others">Others</option>
                                    </select>

                                    <div>
                                        <label className="label">Stock</label>
                                        <input className="form__input" type="text" id="countInStock" placeholder="Enter countInStock" value={countInStock}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCountInStock(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))} />
                                    </div>

                                    <div>
                                        <textarea className="form__input_textArea" rows={textareaRow} id="description" placeholder="Enter description" value={description}
                                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
                                    </div>

                                    <div>
                                        <Button variant="info" type="submit" className="form__submit">
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                            )
                }
            </form>
        </div>
    )
}
