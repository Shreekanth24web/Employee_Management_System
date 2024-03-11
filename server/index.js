const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const UserModel = require('./models/UserData')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employeeMS")

app.post('/', (req, res) => {
      EmployeeModel.create(req.body)
            .then(employee => res.json(employee))
            .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
      const { email, password } = req.body;
      EmployeeModel.findOne({ email: email })
            .then(user => {
                  if (user) {
                        if (user.password === password) {
                              res.json("Success")
                        } else {
                              res.json('The password is incorrect')
                        }

                  } else {
                        res.json("no record existed")
                  }
            })
})

//Admin count
app.get('/admin_count',(req,res)=>{
      EmployeeModel.countDocuments()
      .then(data => res.json(data))
      .catch(err => res.json(err)) 
})
//Admin records
app.get('/admin_records',(req,res)=>{
      EmployeeModel.find({})
      .then(data => res.json(data))
      .catch(err => res.json(err)) 
})

 

//Add
app.post('/addEmployee', async (req, res) => {
      try {
            const { name, email, mobile, desg, gen, course, image, date } = req.body;
            const employee = await UserModel.create({
                  name,
                  email,
                  mobile,
                  desg,
                  gen,
                  course,
                  image,
                  date
            });
            res.status(201).json(employee);
      } catch (error) {
            res.status(400).json({ error: error.message });
      }
});

app.get('/', (req, res) => {
      UserModel.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err))
})

app.get('/getData/:id', (req,res)=>{
      const id = req.params.id;
      UserModel.findById({_id:id})
      .then(data => res.json(data))
      .catch(err => res.json(err))
})

//update
app.put('/updateEmployee/:id', (req,res)=>{
      const id =req.params.id
      const { name, email, mobile, desg, gen, course, image, date } = req.body;
      UserModel.findByIdAndUpdate({_id:id},{
                  name,
                  email,
                  mobile,
                  desg,
                  gen,
                  course,
                  image,
                  date
      })
      .then(data => res.json(data))
      .catch(err => res.json(err))
})

//Delete

app.delete('/deleteData/:id', (req,res)=>{
      const id =req.params.id
      UserModel.findByIdAndDelete({_id:id})
      .then(data=>res.json(data))
      .catch(err=>console.log(err))

})

//Employees count
app.get('/employee_count',(req,res)=>{
      UserModel.countDocuments()
      .then(data => res.json(data))
      .catch(err => res.json(err)) 
})

//logout

app.get('/logout', (req, res) => {
      // Clear the session data
      req.session = null;
      // Redirect the user to the login page or send a success message
      res.status(200).json({ message: 'Logout successful' });
  });
app.listen(3009, () => {
      console.log("server is running")
})