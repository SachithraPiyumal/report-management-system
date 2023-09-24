const router=require("express").Router();
const User=require('../Models/UserModel');

//register new branch

router.post('/register', async (req, res) => {
    try {
      const { headBranch, userBranch, userRole, email, password } = req.body;
  
      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create a new user instance
      const newUser = new User({
        headBranch,
        userBranch,
        userRole, 
        email, 
        password
      });
  
      // Save the user to the database
      await newUser.save();
  
      res.status(201).json({ message: 'New Branch Added' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    
    res.status(200).json({ message: "Login successful",user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



// Define a route to get all users
router.get("/all", async (req, res) => {
    try {
      // Fetch all user records from the database
      const users = await User.find({});
  
      
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
// Get a specific report by ID
router.get("/get/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the report in the database by its unique ID
    const user = await User.findOne({ _id: userId }); 

    if (!user) {
      return res.status(404).json({ message: "USER not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
  

  


module.exports = router;
