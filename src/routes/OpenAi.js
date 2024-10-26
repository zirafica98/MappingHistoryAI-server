const express = require("express")
const router = express.Router()


router.get('/' , async (req,res)=>{
    res.status(200).send({
        message:"Hello from Codex",
    })
})

router.post('/', async (req, res) => {
    const userInput = req.body.prompt;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: userInput }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error.message);
        }

        const gptResponse = data.choices[0].message.content;
        res.json({ response: gptResponse });
    } catch (error) {
        console.error('Greška:', error);
        res.status(500).send('Došlo je do greške: ' + error.message);
    }
});



module.exports = router