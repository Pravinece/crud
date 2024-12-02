const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const Emp = require("./models/employee");
const Employee = require("./models/employee");
const app = express();
const port = 8000;

app.use(cors()); // Correctly applied middleware
app.use(express.json()); // Correctly applied middleware

mongoose
  .connect("mongodb://localhost:27017/Employee")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  try {
    const employee = await Emp.find();
    res.json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      
      const updates = req.body; // Data to update
      console.log(updates);
      
  
      // Attempt to find and update the employee
      const updatedEmployee = await Emp.findByIdAndUpdate({id}, req.body, { new: true });
  
      if (updatedEmployee) {
        res.json(updatedEmployee); // Return the updated data
      } else {
        res.status(404).json({ error: "Employee not found" }); // If no employee found with the given ID
      }
    } catch (err) {
      res.status(500).json({ error: "Error updating employee", details: err.message });
    }
  });

  app.delete('/delete/:id',async(req,res)=>{

      const id=req.params.id;
      const employee= await Emp.findOne({EmployeeId:parseInt(id)});
      if (!employee) {
        return res.json({ error: "Employee not found" });
      }
      const del_id=employee._id;
      const data2=Emp.findByIdAndDelete({_id:del_id})
      .then(()=>{res.json("deleted")
        // console.log(data);
        
      })
      .catch((err)=>{res.json(err)})
  })
  

app.listen(port, () => {
  console.log("Server running on port", port);
});






// const cors=require("cors")
// const mongoose=require("mongoose")
// const express=require("express")
// const Emp=require("./models/employee")
// const app=express()
// const port=3000;

// app.use(cors())
// app.use(express.json())

// mongoose.connect("mongodb://localhost:27017/Employee")
// .then(()=>{
//     console.log("connected to mongodb");
// })
// .catch((err)=>{
//     console.log(err);
// })

// app.get('/', async (req, res) => {
//     try {        
//       const employee = await Emp.find();
//       res.json(employee);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// app.listen(port,()=>{
//     console.log("Connected server");
    
// })