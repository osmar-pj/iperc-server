import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createRoles } from './libs/initial.setup.js'
dotenv.config()
createRoles()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

import authRoutes from './routes/auth.routes.js'
import workRoutes from './routes/work.routes.js'
import taskRoutes from './routes/task.routes.js'
import ipercRoutes from './routes/iperc.routes.js'

app.use('/auth/api/v1', authRoutes)
app.use('/api/v1/work', workRoutes)
app.use('/api/v1/task', taskRoutes)
app.use('/api/v1/iperc', ipercRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

export default app