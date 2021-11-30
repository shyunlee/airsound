import axios from 'axios'

class ImageUploader {

//   dataURLtoFile = (dataurl, fileName) => {
//     let arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
        
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
    
//     return new File([u8arr], fileName, {type:mime});
// }

  async upload(file) {
    const url = `https://jompgkala7.execute-api.us-east-2.amazonaws.com/default/process-profile-image`
    const bucketUrl = 'https://airsounds-media.s3.us-east-2.amazonaws.com/profile/'
    const result = await axios({
      method: 'GET',
      url: `${url}?fileName=${file.name}&fileType=${file.type.split('/')[1]}`,
    })
    const uploadUrl = result.data.uploadURL
    const key = result.data.Key

    const response = await axios.put(uploadUrl, file)
    if (response.status === 200) return bucketUrl+key

    // let reader = new FileReader()
    // reader.onload = async (e) => {
    //   const imageFile = e.target.result
    //   const imageData = this.dataURLtoFile(imageFile, file.name)
    //   const result = await axios.put(uploadUrl, imageData)
    // }
    // reader.readAsDataURL(file)
    return 'failed'
    
  }  
}

export default ImageUploader;
