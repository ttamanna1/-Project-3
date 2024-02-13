import axios from 'axios'

export default function ImageUploadField({ formData, setFormData }) {

  async function handleImageUpload(e) {
    const preset = import.meta.env.VITE_UPLOAD_PRESET
    const file = e.target.files[0]
    const endpoint = import.meta.env.VITE_UPLOAD_URL

    // Create a new form to send to cloudinary
    // We need to append the file and the upload_preset
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', preset)

    // Send the form data to the API endpoint

    const { data: { secure_url } } = await axios.post(endpoint, data)
    console.log('data=>', data)
    console.log('secure_url=>', secure_url)

    // Set form data to image url
    setFormData({ ...formData, poster: secure_url })
    console.log('formData=>', formData)
  }


  return (
    <>

      {formData.poster ?
        <>
          <img src={formData.poster} className="preview" alt="poster" /><br />
          <input type='hidden' name='poster' value={formData.poster} /><br />
        </>
        :
        <>
          <input type="file"  id="fileInput" name="poster" onChange={handleImageUpload} />
          <label htmlFor="fileInput" className="custom-file-upload">Select a file</label>
        </>
      }
    </>
  )
}

// import axios from 'axios';

// export default function ImageUploadField({ formData, setFormData }) {
//   async function handleImageUpload(e) {
//     const preset = import.meta.env.VITE_UPLOAD_PRESET;
//     const file = e.target.files[0];
//     const endpoint = import.meta.env.VITE_UPLOAD_URL;

//     const data = new FormData();
//     data.append('file', file);
//     data.append('upload_preset', preset);

//     try {
//       const { data: { secure_url } } = await axios.post(endpoint, data);
    
//       console.log('Image upload successful');
//       console.log('Previous formData:', formData);
    
//       setFormData(prevData => ({
//         ...prevData,
//         poster: secure_url,
//       }));
    
//       console.log('Updated formData:', formData);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
// }

//   return (
//     <>
//       {formData.poster ? (
//         <>
//           <img src={`${formData.poster}?timestamp=${new Date().getTime()}`} className="preview" alt="poster" /><br />
//           <input type='hidden' name='poster' value={formData.poster} /><br />
//         </>
//       ) : (
//         <>
//           <input type="file" id="fileInput" name="poster" onChange={handleImageUpload} />
//           <label htmlFor="fileInput" className="custom-file-upload">Select a file</label>
//         </>
//       )}
//     </>
//   );
// }
