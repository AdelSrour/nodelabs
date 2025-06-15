## Live Demo

Login (POST) [username, password]: https://respected-complex-bread.glitch.me/users/login

Register (POST) [username, password, rePassword, email]: https://respected-complex-bread.glitch.me/users/signup

CreatePost (POST) (Require Token): https://respected-complex-bread.glitch.me/api/posts

GetAllPosts (GET) (Require Token): https://respected-complex-bread.glitch.me/api/posts

GetPostByID (GET) (Require Token): https://respected-complex-bread.glitch.me/api/posts/:id

UpdatePostByID (PATCH) (Require Authorization [Post must be created by you]): https://respected-complex-bread.glitch.me/api/posts/:id

DeletePostByID (DELETE) (Require Authorization [Post must be created by you]): https://respected-complex-bread.glitch.me/api/posts/:id
