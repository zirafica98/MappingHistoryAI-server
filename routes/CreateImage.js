const express = require("express")
const router = express.Router()
const OpenAI = require("openai");



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Zameni sa svojim API ključem
});
router.get('/' , async (req,res)=>{
    res.status(200).send({
        message:"Hello from Codex",
    })
})

router.post('/', async (req,res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.images.generate({
            //prompt: prompt,
            model:"dall-e-2",
            prompt:prompt,
            size:"256x256",
            quality:"standard"
          });
        //console.log(response.data);
        res.status(200).send({
            bot:response.data[0].url
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})



module.exports = router