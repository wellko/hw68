import React, {useState} from 'react';
import {Poster} from "../../types";
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchPoster, fetchPosterPost} from "../../Containers/poster/posterSlice";
import Loader from "../Loader/Loader";

const Form = () => {
    const posting = useSelector((state:RootState) => state.poster.posting)

    const dispatch: AppDispatch = useDispatch();
    const [post, setPost] = useState<Poster>(
        {
            title: '',
            status: false
        });

    const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost(prev => ({...prev, title: e.target.value
        }))
    };

    const FormEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (post.title.length > 2){
            await dispatch(fetchPosterPost(post));
            dispatch(fetchPoster());
            setPost({
                title:'',
                status: false,
            })
        }

    }

    return (
        <div className='bg-light m-auto shadow-lg border rounded'>
        <form onSubmit={FormEvent}>
         <h3>Add new Task</h3>
            <fieldset className='border-2 rounded border border-primary'>
                <legend>Enter your task</legend>
                <input className='form-text w-100' id='text-input' type='text' onChange={InputChange} value={post.title}/>
                <button disabled={posting} type='submit' className='btn btn-success d-block'>{posting? <Loader/>: 'Add'}</button>
            </fieldset>
        </form>
        </div>
    );
};

export default Form;