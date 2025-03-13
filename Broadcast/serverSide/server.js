import server from "./index.js"

const PORT = process.env.PORT || 9012;
const LOCALHOST = process.env.LOCALHOST;
server.listen(PORT,LOCALHOST,()=>{
    console.log(`Server is running at port ${PORT}`);
})