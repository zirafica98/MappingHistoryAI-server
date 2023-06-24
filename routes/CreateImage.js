const express = require("express")
const router = express.Router()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.get('/' , async (req,res)=>{
    res.status(200).send({
        message:"Hello from Codex",
    })
})

router.post('/', async (req,res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
          });
        //console.log(response.data);
        res.status(200).send({
            bot:response.data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})



module.exports = router