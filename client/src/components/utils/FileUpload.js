import React, { useState} from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload() {
    const [Images, setImages] = useState([]) // 이미지를 여러개 올리기 위해 array로 
     
    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type' : 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image',formData , config)
        .then(response => {
            if(response.data.success) {
                setImages([...Images, response.data.filePath ]) // 모든 이미지를 넣어주기 
            } else {
                alert('파일을 저장하는데 실패하였습니다.')
            }
        })
    }

    return (
        <div style = {{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={ dropHandler }>
                {({getRootProps, getInputProps}) => (
                    <div 
                    style = {{ 
                        width: 300, height: 240, border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type = "plus" style = {{ fontSize: '3rem'}} />        
                    </div>
                )}

            </Dropzone>

            <div style = {{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map( (image, index) => (
                    <div key = {index}>
                        <img style = {{ minWidth: '300px', width: '300px', height: '240px' }}
                            src = {`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </div>
    
        </div>
    )
}

export default FileUpload
