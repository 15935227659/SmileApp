const Koa = require('Koa')
const app = new Koa()

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa</h1>'
})
app.listen(3000,()=>{
    console.log('[Server] port 3000')
})