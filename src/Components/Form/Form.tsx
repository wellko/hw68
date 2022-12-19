import React, {useState} from 'react';
import {Poster} from "../../types";
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import {fetchPoster, fetchPosterPost} from "../../Containers/poster/posterSlice";

const Form = () => {
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
        await dispatch(fetchPosterPost(post));
        dispatch(fetchPoster());
        setPost({
            title:'',
            status: false,
        })
    }

    return (
        <form onSubmit={FormEvent}>
            <input onChange={InputChange} value={post.title}/>
            <button type='submit'> Ok</button>
        </form>
    );
};

export default Form;