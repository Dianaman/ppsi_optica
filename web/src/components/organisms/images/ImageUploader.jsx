import React from 'react';
import Images from './Images';
import Buttons from './Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, removeFile } from '../../../redux/ducks/files.duck';

export function ImageUploader() {

    const dispatch = useDispatch();

    const app = useSelector(state => state);
    const {files} = app.filesReducer;
    const {loading} = app.commonReducer;

    const onChange = e => {
        const files = Array.from(e.target.files)
        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append(i, file)
        })

        dispatch(uploadImage(formData));
    }

    const removeImage = id => {
        dispatch(removeFile(id));
    }

    const content = () => {
        switch(true) {
            case loading:
                return <></>
            case files.length > 0:
                return <Images images={files} removeImage={removeImage} />
            default:
                return <Buttons onChange={onChange} />
        }
    }

    return (
        <div>
            <div className='buttons'>
                {content()}
            </div>
        </div>
    )
}
