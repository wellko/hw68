import React, {MouseEventHandler, useState} from 'react';
import {Poster} from "../../types";
import {fetchDelete, fetchPoster, fetchPosterChange} from "../../Containers/poster/posterSlice";
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader/Loader";

const Post: React.FC<Poster> = ({title, status, id}) => {
		const disabled = useSelector((state: RootState) => state.poster.disabled);

		const dispatch: AppDispatch = useDispatch();

		const [deleting, setDeleting] = useState(false);

		const [saving, setSaving] = useState(false);

		const [post, setPost] = useState<Poster>({
			title: title,
			status: status,
			id: id,
		})

		const CheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setPost(prev => ({...prev, status: e.target.checked}));
		}

		const CheckBoxSave: MouseEventHandler = async () => {
			setSaving(true);
			await dispatch(fetchPosterChange(post));
			setSaving(false);
			dispatch(fetchPoster());
		}

		const DeleteClick: MouseEventHandler = async () => {
			setDeleting(true);
			await dispatch(fetchDelete(post));
			setSaving(false);
			dispatch(fetchPoster());
		}

		return (
			<div className='d-flex justify-content-between p-4 m-4 border border-primary border-2 rounded shadow-lg'>
				<h4>{title}</h4>
				<div className="form-check form-switch">
					<input className='form-check-input' type='checkbox' id='check' checked={post.status}
						   onChange={CheckBoxChange}/>
					<label htmlFor='check'>{post.status ? 'Done' : 'Not Done yet'}</label>
				</div>
				<div>
					<button disabled={disabled} className='btn btn-outline-primary me-1' onClick={CheckBoxSave}>{saving ?
						<Loader/> : 'Save'}</button>
					<button disabled={disabled} className='btn btn-outline-danger' onClick={DeleteClick}>{deleting ?
						<Loader/> : 'Delete'}</button>
				</div>
			</div>
		);
	}
;

export default Post;