
const cors=require("cors");
const express=require("express");
const cookieParser=require("cookie-parser");
const { act } = require("react");
const mongoClient=require("mongodb").MongoClient

const conString="mongodb://127.0.0.1:27017"

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.get('/admin',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")
        db.collection('admin').find({}).toArray().then(document=>{
            res.send(document)
            res.end();
        })
    })
})

app.get('/users',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")

        db.collection('users').find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})

app.get('/videos',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")
        db.collection('videos').find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })
    })
})

app.get('/videos/:id',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        const id=parseInt(req.params.id);
        const db=clientObj.db("video_liabrary")
        db.collection('videos').findOne({video_id:id}).then(document=>{
            res.send(document)
            res.end()
        })

    })
})

app.get('/videos/category/:category_name', (req, res) => {
    const categoryName = req.params.category_name;
    

    mongoClient.connect(conString)
        .then(clientObj => {
            const db = clientObj.db("video_liabrary");

            db.collection('categories').findOne({ category_name: categoryName })
                .then(categoryDoc => {
                    if (!categoryDoc) {
                        console.log("Category not found:", categoryName);
                        res.status(404).send([]); // No such category
                        return;
                    }

                    const categoryId = categoryDoc.category_id;
                    console.log("Found categoryId:", categoryId);

                    db.collection('videos')
                        .find({ category_id: categoryId })
                        .toArray()
                        .then(videoDocs => {
                            console.log("Videos found:", videoDocs.length);
                            res.send(videoDocs);
                            res.end();
                        })
                        .catch(err => {
                            console.error("Error fetching videos:", err);
                            res.status(500).send("Error fetching videos");
                        });
                })
                .catch(err => {
                    console.error("Error fetching category:", err);
                    res.status(500).send("Error fetching category");
                });
        })
        
});



app.get('/categories',(req,res)=>{
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary");
        db.collection('categories').find({}).toArray().then(document=>{
            res.send(document)
            res.end()
        })


    })
})

app.post('/register-user',(req,res)=>{
    const user=req.body;
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary");
        db.collection('users').insertOne(user).then(()=>{
            res.send("User registered successfully")
            res.end()
        })
    })

})

app.post('/add-video',(req,res)=>{

    var video={
        video_id:parseInt(req.body.video_id),
        title:req.body.title,
        description:req.body.description,
        url:req.body.url,
        likes:parseInt(req.body.likes),
        dislikes:parseInt(req.body.dislikes),
        views:parseInt(req.body.views),
        category_id:parseInt(req.body.category_id)
    };
    
   
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary");
        db.collection('videos').insertOne(video).then(()=>{
            res.send("Video added successfully")
            res.end()
            })
    })
})

app.put('/edit-video/:id', (req, res)=>{
    

    var id = parseInt(req.params.id);

    var video = {
        video_id : parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req.body.likes),
        dislikes: parseInt(req.body.dislikes),
        views: parseInt(req.body.views),
        category_id: parseInt(req.body.category_id)
    };

    mongoClient.connect(conString).then(clientObject=>{

        var database = clientObject.db("video_liabrary");

        database.collection("videos").updateOne({video_id:id},{$set: video}).then(()=>{
             console.log('Video Updated ----');
             res.send();
        });
    });
});

app.delete('/delete-video/:id', (req, res)=>{

    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject=>{

        var database = clientObject.db("video_liabrary");

        database.collection("videos").deleteOne({video_id:id}).then(()=>{
             console.log('Video Deleted');
             res.send();
        });
    });
});

app.post('/watch-later', (req, res) => {
    const username = req.body.username;
    const video = req.body.video;

    mongoClient.connect(conString).then(client => {
        const db = client.db("video_liabrary");
        db.collection("Watch_later").updateOne(
            { username: username },
            { $addToSet: { videos: video } },
            { upsert: true }
        ).then(() => {
            res.send({ message: "Video added to watch later list" });
        });
    });
});



app.get('/watch-later/:username',(req,res)=>{
    const username = req.params.username;

    mongoClient.connect(conString).then(clientObj =>{
        const db=clientObj.db("video_liabrary")

        db.collection("Watch_later").findOne({username:username}).then(data =>{
            res.send(data.videos);

        })
    })
})

app.post('/videos/likes',(req,res)=>{

    const videoId = parseInt(req.body.video_id);
    const username = req.body.username;
    const action=req.body.action;

    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")
        if (action === "like") {
            db.collection("videos").updateOne({ video_id: videoId }, { $inc: { likes: 1 } }).then(() => {
                console.log("liked");
                res.send();
            });
        } else {
            db.collection("videos").updateOne({ video_id: videoId }, { $inc: { likes: -1 } }).then(() => {
                console.log("unliked");
                res.send();
            });
        }

        
    })
})

app.post('/videos/dislikes',async (req,res)=>{
    const videoId = parseInt(req.body.video_id);
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")

        db.collection("videos").updateOne({video_id:videoId},{$inc:{dislikes:1}}).then(()=>{
            console.log("disliked")
        })
    })

})

app.delete('/remove-video',(req,res)=>{
    const id=parseInt(req.body.video_id);
    const username=req.body.username;
    mongoClient.connect(conString).then(clientObj =>{
        const db=clientObj.db("video_liabrary")
        db.collection("Watch_later").updateOne({username:username},{$pull :{videos:{video_id:id}}})
        .then(()=>{
            console.log("removed")
        })

    })
})

app.post('/videos/views',async (req,res)=>{
    const videoId = parseInt(req.body.video_id);
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")

        db.collection("videos").updateOne({video_id:videoId},{$inc:{views:1}}).then(()=>{
            console.log("viewed")
        })
    })

})

//Comment Api
app.post('/comments',async (req,res)=>{
    const video_id = parseInt(req.body.video_id);
    const comment=req.body.text;
    const username=req.body.username;
    const commentObj = { video_id, username, comment, timestamp: new Date() };
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")
        db.collection("comments").insertOne(commentObj).then(()=>console.log("Comment Added"))
    })
})

app.get('/comments/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    mongoClient.connect(conString).then(clientObj=>{
        const db=clientObj.db("video_liabrary")

        db.collection("comments").find({video_id:id}).sort({timestamp:-1}).toArray().then(resonse=>res.json(resonse))
    })
})



app.listen(5050);