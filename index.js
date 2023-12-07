const express = require('express')
const cors = require('cors')

const app = express();
require('./services/db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoutes')


app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(express.json())
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)
app.use('/booking',bookingRoute)


port = 5000



app.listen(port, () => {
    console.log('server is listening in port ' +port);
})