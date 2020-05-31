const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//All authors Route
router.get('/', async (req, res) => {
    let searhOptions = {}
    if(req.query.name != null && req.query.name != ''){
        searhOptions.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(searhOptions)
        res.render('authors/index',{authors: authors,searhOptions: req.query})
    }catch{
        res.redirect('/')
    }
})

//New author

router.get('/new',(req, res)=>{
    res.render('authors/new',{ author: new Author()})
})

//create author route
router.post('/',async(req, res)=>{
    const author = new Author({
        name:req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect('authors')
    }catch {
        res.render('authors/new',{
            author: author,
            errorMessage:'Error creating author'
        })

    }

})


module.exports = router