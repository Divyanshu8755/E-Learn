import multer from 'multer'
import {v4 as uuid} from 'uuid'
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads") //cb is callback function
    },
    filename(req,file,cb){
        const id=uuid()
        const extName= file.originalname.split(".").pop() //a every file name ends with .jpg .png or jpeg
        const fileName=`${id}.${extName}`;
        cb(null,fileName)
    }
})

export const uploadFiles=multer({storage}).single("file");