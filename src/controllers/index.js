const homepage = (req,res) =>{
    res.status(200).send(`
    <h1>welcome to express js</h1>`)
}

export default {
    homepage
}