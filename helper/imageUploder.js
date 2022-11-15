const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/image')
    },
    filename: function(req,file,cb){
        cb(null, new Data().getTime() + path.extname(file.originalname))

    }
})

const fileFilter = (req, file,cb)=>{
    if (file.mimeType == 'image/jpeg' || file.mimeType == 'image/png'){
        cb(null, true)
    }
    else{
        cb(new Error ('Unsupported File'). false)
    }

}

export const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*10

    },
    fileFilter: fileFilter
})

