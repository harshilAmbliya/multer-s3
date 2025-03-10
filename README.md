# Multer-S3 File Upload Guide 🚀

This guide walks you through setting up **Multer-S3** to upload files to **Amazon S3** using **Node.js & Express**.

---
## 📌 Prerequisites
Make sure you have the following:
- **Node.js** installed
- **AWS Account** with an S3 bucket
- **IAM User** with necessary permissions
- **AWS SDK v3** installed

---
## ⚙️ 1. Install Required Packages

```sh
npm install multer multer-s3 @aws-sdk/client-s3 dotenv
```
![Install Packages](https://your-gif-link.com/install.gif)

---
## 📝 2. Configure AWS Credentials
Create a `.env` file and add your AWS credentials:

```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=your-bucket-name
```

⚠️ **Never share or commit AWS credentials to GitHub!**

---
## 🔧 3. Set Up Multer-S3 Storage

Create `upload.js` and configure multer to store files in S3:

```js
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `uploads/${Date.now()}-${file.originalname}`);
        }
    })
});

export default upload;
```
![Multer Configuration](https://your-gif-link.com/multer-config.gif)

---
## 🌍 4. Create an Express API Route

Modify `server.js` to use the `upload` middleware:

```js
import express from 'express';
import upload from './upload.js';

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: 'File uploaded successfully!',
        fileUrl: req.file.location
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));
```
![API Setup](https://your-gif-link.com/api-setup.gif)

---
## 🔗 5. Update S3 Bucket Policy

To make files publicly accessible, update your S3 **Bucket Policy**:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```
![Bucket Policy Update](https://your-gif-link.com/bucket-policy.gif)

---
## 🚀 6. Test the API
Use **Postman** or **cURL** to test file upload:

```sh
curl -X POST -F "file=@path-to-your-file.jpg" http://localhost:5000/upload
```

If successful, you'll get a response with the **S3 file URL**:
```json
{
    "message": "File uploaded successfully!",
    "fileUrl": "https://s3.ap-south-1.amazonaws.com/your-bucket-name/uploads/1234567890-file.jpg"
}
```
![Test API](https://your-gif-link.com/test-api.gif)

---
## 🎉 Done!
You have successfully set up **Multer-S3** for file uploads to **AWS S3**! 🎊

If you found this helpful, ⭐ the repo and share it!

---
📖 **More Resources:**
- [AWS S3 Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Multer-S3 GitHub](https://github.com/badunk/multer-s3)

