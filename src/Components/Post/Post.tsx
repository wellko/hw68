import React, {useState} from 'react';
import {Poster} from "../../types";
import {fetchPoster, fetchPosterChange} from "../../Containers/poster/posterSlice";
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";

const Post: React.FC<Poster> = ({title, status, id}) => {

    const dispatch: AppDispatch = useDispatch();

    const [post, setPost] = useState<Poster>({
        title: title,
        status: status,
    })

    const CheckBoxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await setPost(prev => ({...prev, status: e.target.checked}));
        await fetchPosterChange(post);
        dispatch(fetchPoster());
    }

    return (
        <div>
            <h1>{title}</h1>
            <input type='checkbox' defaultChecked={post.status} onChange={CheckBoxChange}/>
        </div>
    );
};

export default Post;