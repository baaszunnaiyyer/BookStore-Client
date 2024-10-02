import React, {useState} from 'react'
import BackButton from '../component/BackButton';
import Spinner from '../component/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {useSnackbar} from 'notistack';

const DeleteBook = () => {
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handelDelete = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
  .then(()=>{
    setLoading(false)
    enqueueSnackbar("Book Deleted Sucessfully", {variant:'success'})
    navigate('/')
  })
  .catch((error)=>{
    console.log(error);
    enqueueSnackbar("Book was not Deleted", {variant:'error'})
    setLoading(false)
  })}

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>

      <div className='flex justify-center item-center'>
        <button className='bg-red-600 px-24 py-6 text-2xl text-white rounded-full my-16' onClick={handelDelete}>Delete this Book</button>

      </div>

    </div>
  )
}

export default DeleteBook