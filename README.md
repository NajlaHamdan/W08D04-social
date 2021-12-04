# W08D04
# Package used 
- express
- dotenv
- jsonwebtoken 
- bcrypt
- mongoose
# Schemas
- uesr
| Email | Password | userName | Role | Posts |
| --- | --- |
| String | String | String(bcrybt) | Array |Array |
- role
- post
- comment
- like
# Functions
user can do to his/her comments and posts the following functions
if the user has been registered or logged in  
### Create 
if the user has been registered or logged in he/she  can create thier own posts and comments and he can liked post.
### Read 
the user can read his own posts and comments.
### Update 
the user can update spcific comment and post .
### Delete 
the user can delete spcific comment and post .

**Note: we use Json web tocken to generate tocken if the user logged in**.<br />
**Note: we use bcrybt to hash password if the user registerd**.

## Functions for admin
### Delete comment
Admin can delete any comment from any user.
### Delete post
Admin can delete any post from any user.
### Remove user
admin can delete any user account.
