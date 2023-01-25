import Upload from 'antd/es/upload/Upload'
import { FC, useState } from 'react'
export const MediaApi:FC = () => {
    const [fileList,setFileList] = useState([])
    const [loading,setLoading] = useState(false)
    const handlyChange = async (file:[]) => {
        setLoading(true)
    }
    return(
        <>
        <Upload
        fileList={fileList}
        customRequest = {(file:any) => handlyChange(file)}
        >

        </Upload>
        </>
    )
}