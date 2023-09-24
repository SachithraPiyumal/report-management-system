const router = require("express").Router();
const multer = require("multer"); // For handling file uploads
const Report = require("../Models/ReportModel");

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "reports/"); // Specify the directory where report files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Accept PDF files
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15, // 5MB
  },
  fileFilter: fileFilter,
});

// Add a report to the DB
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const { headBranch, userBranch } = req.body;
    const reportFile = req.file; 

    // Check if all required fields are provided
    if (!headBranch || !userBranch || !reportFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the report data along with userBranch and headBranch to the database
    const reportData = {
      headBranch,
      userBranch,
      report: reportFile.path, 
    };

    // Create a new report instance and save it to the database
    await Report.create(reportData);

    res.status(201).json({ message: "Report added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all reports
router.get("/all", async (req, res) => {
    try {
      // Find all reports in the database
      const reports = await Report.find({}); 
  
      res.status(200).json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

// Get a specific report by ID
router.get("/get/:id", async (req, res) => {
    try {
      const reportId = req.params.id;
  
      // Find the report in the database by its unique ID
      const report = await Report.findOne({ _id: reportId }); 
  
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      res.status(200).json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // Delete a specific report by ID
router.delete("/delete/:id", async (req, res) => {
    try {
      const reportId = req.params.id;
  
      // Find and remove the report from the database by its unique ID
      const deletedReport = await Report.findOneAndDelete({ _id: reportId });
  
      if (!deletedReport) {
        return res.status(404).json({ message: "Report not found" });
      }
  
      res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

module.exports = router;
