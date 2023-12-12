import { Response,Request } from "express";
import multiparty from "multiparty";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_API,
});
class Upload {
  async perfilProfile (req:Request,res:Response){

    const form = new multiparty.Form();
    const {  files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({
          fields,
          files,
        });
      });
    }) as any;
    
    const file = files.file[0]
  
     try {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${Math.floor(Math.random() * 99999)}_e-comerce`,
        crop: "fill",
      });
      return res.status(200).json({file:result.secure_url})
     } catch (error) {
        return res.status(500).json({message:"Erro no servidor tente novamente mais tarde!"})
     }
  }
  async imageImoveis (req:Request,res:Response){
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({
          fields,
          files,
        });
      });
    }) as any;
   let url = []
    
  for (const file of files.file){
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${Math.floor(Math.random() * 99999)}_e-comerce`,
        crop: "fill",
      });
      url.push(result.secure_url)
      return res.status(200).json(url)
     } catch (error) {
        return res.status(500).json({message:"Erro no servidor tente novamente mais tarde!"})
     }
   
       

  
  }
  
  }
}
const UploadController = new Upload();
export default UploadController;