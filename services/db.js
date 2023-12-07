const mongoose = require('mongoose')

const DB = "mongodb+srv://Akhil:Luminar123@cluster0.oqhvneu.mongodb.net/Hotel-booking"

mongoose.connect(DB, {
    
}).then(() => {
    console.log('Database connection established successfully');
}).catch(() => {
    console.log('error connecting to the database');
})

