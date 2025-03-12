import server from "./index.js";

const PORT = process.env.PORT || 7999;

server.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
})
