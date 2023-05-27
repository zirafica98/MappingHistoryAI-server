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
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            //model: "gpt-3.5-turbo-0301",
            prompt: `${prompt}`,
            temperature: 0.5, // Higher values means the model will take more risks.
            max_tokens: 1400, // The maximum opennumber of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            //top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
          });

        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error})
    }
})

module.exports = router