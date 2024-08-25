import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'
import { url } from '../App'

function AddAlbum() {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColor', color);

      const response = await axios.post(`${url}/api/album/add`, formData);
      console.log(response);

      if (response.data.success) {
        toast.success('Album added');
        setName(''); // Reset input fields
        setDesc('');
        setImage(false);
        setColor('#ffffff')
      } 
      else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Error');
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className='w-grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-grey-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type='file'
          id='image'
          accept='image/*'
          hidden
        />
        <label htmlFor='image'>
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className='w-24 cursor-pointer'
            alt=''
          />
        </label>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='bg-transparent outline-green-600 border-2 border-gray-400 w-[max(40vw, 250px)]'
          placeholder='type here'
          required
        />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type='text'
          className='bg-transparent outline-green-600 border-2 border-gray-400 w-[max(40vw, 250px)]'
          placeholder='type here'
          required
        />
      </div>
      <div className='flex flex-col gap-3'>
        <p>Background color</p>
        <input
          onChange={(e) => setColor(e.target.value)}
          value={color}
          type='color'
        />
      </div>
      <button className='text-base bg-black py-2.5 px-14 cursor-pointer text-white' type='submit'>
        Submit
      </button>
    </form>
  );

}

export default AddAlbum;