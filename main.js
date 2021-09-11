var Gallery =require ('./gallery');

Gallery.Gallery('./', (err, gallery) =>{
    if(err){
        throw err;
    }

    gallery.forEach((album) =>{
        album.photos((err, photos) =>{
            if(err){
                throw err;
            }
            console.log(album.name);
            console.table(photos);
        })
    })
})