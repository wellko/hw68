import React, {useEffect} from 'react';
import {fetchPoster} from "./posterSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import Post from "../../Components/Post/Post";


const Poster = () => {
    const dispatch: AppDispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.poster.posts);
    const loading = useSelector((state:RootState) => state.poster.loading)
    useEffect(() => {
            dispatch(fetchPoster());
        }, [dispatch]
    )

    return (
        <div className='flex-grow-1 me-4'>
            {loading? 'Loading. . .' : (posts.map(item => (<Post  key={Math.random()} title={item.title} status={item.status} id={item.id}/>)))}

        </div>
    );
};

export default Poster;