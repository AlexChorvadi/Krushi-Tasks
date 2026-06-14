can you rewirte backend readme file and make sure i am not using main transpoperte i am using resend mail here is some post man urls

Register API -
postman request POST 'https://password-reset-ajfj.onrender.com/api/register' \
  --header 'Content-Type: application/json' \
  --body '{"name":"Name","email":"email", "password":"pass"}'
success res - {
    "success": true,
    "message": "Registration successful"
}
failer res - {
    "success": false,
    "message": "Email already exists"
}

Login API - 
postman request POST 'https://password-reset-ajfj.onrender.com/api/login' \
  --header 'Content-Type: application/json' \
  --body '{"email":"email@gmail.com", "password":"passxx"}'
success res - {
    "_id": "xxx",
    "name": "xxx",
    "email": "xxx",
    "password": "xxx",
    "createdAt": "xxx",
    "updatedAt": "xxx",
    "__v": 0,
    "resetToken": "xxx",
    "resetTokenExpire": "xxx"
}
failer res - {
    "success": false,
    "message": "Invalid credentials"
}