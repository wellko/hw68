import React, {useEffect} from 'react';
import {fetchPoster} from "./posterSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import Post from "../../Components/Post/Post";


const Poster = () => {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.poster.posts);

    useEffect(() => {
            dispatch(fetchPoster());
        }, [dispatch]
    )

    return (
        <div>
            {posts.map(item => (<Post  key={Math.random()} title={item.title} status={item.status} id={item.id}/>))}
        </div>
    );
};

export default Poster;