import axios from 'axios'
import React from 'react'

function ImageUpload(props) {
    const FileUpload = (e)=>{
        var formData = new FormData() //서버로 보내기 위한 파일내용 인코딩
        formData.append("image", e.target.files[0]) //file이름으로 첨부된 파일 데이터를 추가
        axios.post('/api/post/image/upload', formData)
        .then((res)=>{
            props.setImage(res.data.filepath)
        }).catch((err)=>{
            console.log(err)
        })

    }

  return (
    <div>
        <input onChange={(e)=>FileUpload(e)} type="file" accept='image/*'/>
    </div>
  )
}

export default ImageUpload