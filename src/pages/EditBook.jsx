import { useEffect, useState } from "react";
import BackButton from "../component/BackButton";
import Spinner from "../component/Spinner"; // fixed import case
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Added proper import
import {useSnackbar} from 'notistack';


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();


  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((res)=>{
      setLoading(true);      
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);      
      setLoading(false);
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false)
    })
   }, [])

  const handelEditBook = () => { // Corrected spelling
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited Sucessfully", {variant:'success'})
        navigate('/');
      })
      .catch((error) => { // Added error parameter
        setLoading(false);
        enqueueSnackbar("Book was not Edited Sucessfully", {variant:'error'})
        console.log(error); // Log error
      });
  };

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (<Spinner/>) : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/> {/* Fixed border spelling */}

          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>

          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-4 py-2 w-full"/>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handelEditBook}> Save </button> {/* Corrected function name */}
      </div>
    </div>
  );
}


// const EditBook = ()=>{
//   return(
//     <div>
//       edit Book
//     </div>
//   )
// }
export default EditBook;
