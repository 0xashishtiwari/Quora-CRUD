const express = require('express');
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');



const app = express();

const PORT = 8080;

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views' , path.join(__dirname , "/views"));

let posts = [
    {   id : uuidv4(),
        username : "apna college",
        content  : "I love coding",

    },
    {   id : uuidv4(),
        username : "ashish tiwari",
        content  : "Hard work is important to achieve scucess",

    },
    {   id : uuidv4(),
        username : "aman tiwari",
        content  : "I got selected for my first internship",

    },
];


app.get('/posts',  (req , res)=>{
    res.render('index.ejs', {posts});
});

app.get('/posts/new' , (req , res)=>{
    res.render('new.ejs');
})

app.post('/posts' , (req, res)=>{
    let {username , content} = req.body;
    let id = uuidv4();

    console.log(id); 
    posts.push({ id : id ,  username : username , content : content});
    console.log(req.body);
    res.redirect('/posts');
});

app.get('/posts/:id' , (req ,res)=>{
        let {id} = req.params;
        let post = posts.find((p)=> id == p.id);
        console.log(post);
        res.render('show.ejs' , {post});
})

app.patch('/posts/:id' , (req , res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id == p.id);
    post.content = newContent;
    console.log(post);
   res.redirect(`/posts`);

})

app.get('/posts/:id/edit', (req , res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    res.render('edit.ejs' , {post });
})
app.delete('/posts/:id' , (req ,res)=>{
    let {id}  = req.params;
     posts = posts.filter((p)=>id!=p.id);
    res.redirect('/posts');
})
app.listen(PORT  , ()=>{
    console.log(`Server started at port ${PORT}`);
})