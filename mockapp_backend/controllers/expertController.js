import ExpertDetails from '../models/expertModel.js'
// controllers/expertController.js (add below getExpertProfile)
import path from "path";
import fs from "fs";

// if you already have multer config, use that instead
import multer from "multer";
import { log } from 'console';

// ----------------- profile completion -----------------
// Controller file (where getExpertProfile lives)
 // adjust import path as needed

// Simple local storage multer (modify for S3 or cloud storage in production)
const uploadDir = path.join(process.cwd(), "uploads", "profileImages");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".jpg";
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});
export const uploadMiddleware = multer({ storage });

// Controller to handle photo upload
export const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.headers.userid || req.header("userid");
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing in headers (send header 'userid')" });
    }

    // multer should have put file on req.file
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded. Field name must be 'photo'." });
    }

    // Build a URL or path for the saved image. Adjust if using CDN/S3.
    // Example: /uploads/profileImages/<filename>
    const photoUrl = `/uploads/profileImages/${req.file.filename}`;

    // Find expert
    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      // If you want to allow creating a new ExpertDetails, you'd need to supply required personalInformation fields.
      return res.status(404).json({
        success: false,
        message: "Expert profile not found. Please create/complete Personal Information before uploading a photo.",
      });
    }

    // Update profileImage
    expert.profileImage = photoUrl;
    await expert.save();

    // Recalculate completion (reuse logic from getExpertProfile)
    let score = 0;
    const p = expert.personalInformation || {};
    const personalFilled =
      p.userName &&
      p.mobile &&
      p.gender &&
      p.dob &&
      p.country &&
      p.state &&
      p.city;

    if (personalFilled) score += 25;
    if (Array.isArray(expert.education) && expert.education.length > 0) score += 15;
    const pd = expert.professionalDetails || {};
    const proFilled =
      pd.title &&
      pd.company &&
      pd.industry &&
      typeof pd.totalExperience === "number";
    if (proFilled) score += 20;
    const sk = expert.skillsAndExpertise || {};
    if ((sk.domains?.length || sk.tools?.length || sk.languages?.length)) score += 15;
    const av = expert.availability || {};
    const weeklyHasSlots =
      av.weekly && Object.values(av.weekly || {}).some((arr) => Array.isArray(arr) && arr.length > 0);
    const availabilityFilled = av.sessionDuration && av.maxPerDay && (weeklyHasSlots || (av.breakDates && av.breakDates.length > 0));
    if (availabilityFilled) score += 15;
    if (expert.profileImage) score += 10;
    const completion = Math.min(score, 100);

    return res.json({
      success: true,
      completion,
      profile: {
        name: expert.personalInformation?.userName || "",
        photoUrl: expert.profileImage || "",
        title: expert.professionalDetails?.title || "",
        company: expert.professionalDetails?.company || "",
      }
    });
  } catch (err) {
    console.error("uploadProfilePhoto error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};


export const getExpertProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    console.log('New',userId);
    
    console.log(req.body);
    

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    const expert = await ExpertDetails.findOne({ userId });

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert profile not found"
      });
    }

    const p = expert.personalInformation || {};
    const professional = expert.professionalDetails || {};

    return res.json({
      success: true,
      completion: 100, // or your logic
      profile: {
        name: p.userName || "",
        title: professional.title || "",
        company: professional.company || "",
        photoUrl: expert.profileImage || ""
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




// ----------------- get Personal Information -----------------
export const getPersonalInfo = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const expert = await ExpertDetails.findOne({ userId });

    if (expert) {
      return res.status(200).json({ success: true, data: expert.personalInformation });
    } else {
      // User not present, return empty object
      return res.status(200).json({
        success: true,
        data: {
          userName: "",
          mobile: "",
          gender: "",
          dob: "",
          country: "",
          state: "",
          city: "",
        },
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Update Personal Information -----------------
export const updatePersonalInfo = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { userName, mobile, gender, dob, country, state, city } = req.body;

    const expert = await ExpertDetails.findOneAndUpdate(
      { userId },
      {
        personalInformation: {
          userName: userName.trim(),
          mobile: mobile.trim(),
          gender,
          dob,
          country: country.trim(),
          state: state.trim(),
          city: city.trim(),
        },
        userId, // needed if creating new doc
      },
      { new: true, upsert: true } // create if not exists, return updated doc
    );

    res.status(200).json({
      success: true,
      message: "Personal info updated successfully",
      data: expert,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ----------------- Get Education -----------------
export const getEducation = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const expert = await ExpertDetails.findOne({ userId });

    if (expert && expert.education && expert.education.length > 0) {
      return res.status(200).json({ success: true, data: expert.education });
    } else {
      // No education entries yet
      return res.status(200).json({ success: true, data: [] });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Update Education -----------------
export const updateEducation = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { education } = req.body; // expects array of education objects

    if (!education || !Array.isArray(education)) {
      return res.status(400).json({ success: false, message: "Education must be an array" });
    }

    // Ensure user exists (optional: can enforce personal info first)
    const expert = await ExpertDetails.findOneAndUpdate(
      { userId },
      {
        education: education.map((edu) => ({
          degree: edu.degree || "",
          institution: edu.institution || "",
          field: edu.field || "",
          start: edu.start || "",
          end: edu.end || "",
        })),
        userId, // upsert needs this
      },
      { new: true, upsert: true } // create if not exists, return updated doc
    );

    res.status(200).json({
      success: true,
      message: "Education info updated successfully",
      data: expert.education,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- Delete single education entry -----------------
export const deleteEducationEntry = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { idx } = req.params; // index to delete

    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (idx < 0 || idx >= expert.education.length) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    // Remove the entry at the given index
    expert.education.splice(idx, 1);

    // Save without running validators for unrelated fields
    await expert.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Education entry deleted successfully",
      data: expert.education,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ----------------- GET Professional -----------------
export const getProfessional = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const expert = await ExpertDetails.findOne({ userId });

    if (expert && expert.professionalDetails) {
      return res.status(200).json({
        success: true,
        data: expert.professionalDetails,
      });
    }

    // Default empty structure
    return res.status(200).json({
      success: true,
      data: {
        title: "",
        company: "",
        totalExperience: "",
        industry: "",
        previous: [],
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- UPDATE Professional -----------------
export const updateProfessional = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { professionalDetails } = req.body;

    if (!professionalDetails) {
      return res.status(400).json({
        success: false,
        message: "Professional details are required",
      });
    }

    const expert = await ExpertDetails.findOneAndUpdate(
      { userId },
      {
        professionalDetails: {
          title: professionalDetails.title || "",
          company: professionalDetails.company || "",
          totalExperience: professionalDetails.totalExperience || 0,
          industry: professionalDetails.industry || "",
          previous: Array.isArray(professionalDetails.previous)
            ? professionalDetails.previous.map((exp) => ({
              company: exp.company || "",
              title: exp.title || "",
              start: exp.start || "",
              end: exp.end || "",
            }))
            : [],
        },
        userId,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Professional details updated",
      data: expert.professionalDetails,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- DELETE One Previous Experience -----------------
export const deletePreviousExperience = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { idx } = req.params; // index to delete

    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate index and existence of previous array
    if (
      !expert.professionalDetails ||
      !expert.professionalDetails.previous ||
      idx < 0 ||
      idx >= expert.professionalDetails.previous.length
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid index",
      });
    }

    // Remove entry
    expert.professionalDetails.previous.splice(idx, 1);

    // Save WITHOUT triggering validators for other fields
    await expert.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Previous experience deleted successfully",
      data: expert.professionalDetails.previous,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ----------------- GET SkillsAndExpertise -----------------
export const getSkillsAndExpertise = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Skills & Expertise fetched successfully",
      data: expert.skillsAndExpertise || {
        mode: "Online",
        domains: [],
        tools: [],
        languages: [],
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----------------- UPDATE SkillsAndExpertise -----------------
export const updateSkillsAndExpertise = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const skills = req.body.skillsAndExpertise; // FIXED HERE

    if (!skills) {
      return res.status(400).json({
        success: false,
        message: "skillsAndExpertise is required in body",
      });
    }

    const { mode, domains, tools, languages } = skills;

    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate mode
    if (mode) {
      const allowedModes = ["Online", "Offline", "Hybrid"];
      if (!allowedModes.includes(mode)) {
        return res.status(400).json({
          success: false,
          message: "Invalid mode. Allowed: Online, Offline, Hybrid",
        });
      }
      expert.skillsAndExpertise.mode = mode;
    }

    if (Array.isArray(domains)) {
      expert.skillsAndExpertise.domains = domains;
    }

    if (Array.isArray(tools)) {
      expert.skillsAndExpertise.tools = tools;
    }

    if (Array.isArray(languages)) {
      expert.skillsAndExpertise.languages = languages;
    }

    await expert.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Skills & Expertise updated successfully",
      data: expert.skillsAndExpertise,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ----------------- GET Availability -----------------
export const getAvailability = async (req, res) => {
  try {
    const userId = req.headers.userid;

    const expert = await ExpertDetails.findOne({ userId });

    if (expert && expert.availability) {
      return res.status(200).json({
        success: true,
        data: expert.availability,
      });
    }

    // Default empty structure
    return res.status(200).json({
      success: true,
      data: {
        timezone: "",
        days: [],
        slots: [],
      },
    });
  } catch (err) {
    console.error("Error in getAvailability:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// ----------------- UPDATE Availability -----------------
export const updateAvailability = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const newAvailability = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing in headers" });
    }

    // Find expert by userId
    const expert = await ExpertDetails.findOne({ userId });

    if (!expert) {
      return res.status(404).json({ success: false, message: "Expert not found" });
    }

    // Update availability fields
    expert.availability.sessionDuration = newAvailability.sessionDuration || expert.availability.sessionDuration;
    expert.availability.maxPerDay = newAvailability.maxPerDay || expert.availability.maxPerDay;
    expert.availability.weekly = newAvailability.weekly || expert.availability.weekly;
    expert.availability.breakDates = newAvailability.breakDates || expert.availability.breakDates;

    await expert.save();

    return res.status(200).json({ success: true, message: "Availability updated successfully", data: expert.availability });
  } catch (err) {
    console.error("Error in updateAvailability:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


/* ----------------- Delete a Break Date ----------------- */
export const deleteBreakDate = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { start } = req.body; // the start date of the break to remove

    if (!userId || !start) {
      return res.status(400).json({ success: false, message: "User ID or break date missing" });
    }

    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      return res.status(404).json({ success: false, message: "Expert not found" });
    }

    expert.availability.breakDates = expert.availability.breakDates.filter(
      (d) => d.start.toISOString() !== new Date(start).toISOString()
    );

    await expert.save();

    return res.status(200).json({ success: true, message: "Break date removed", data: expert.availability.breakDates });
  } catch (err) {
    console.error("Error deleting break date:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ----------------- Delete a Weekly Slot ----------------- */
export const deleteWeeklySlot = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { day, from } = req.body; // day = "mon", "tue", etc., from = slot start time

    if (!userId || !day || !from) {
      return res.status(400).json({ success: false, message: "User ID, day, or slot start time missing" });
    }

    const expert = await ExpertDetails.findOne({ userId });
    if (!expert) {
      return res.status(404).json({ success: false, message: "Expert not found" });
    }

    const slots = expert.availability.weekly.get(day) || [];
    expert.availability.weekly.set(
      day,
      slots.filter(slot => slot.from !== from)
    );

    await expert.save();

    return res.status(200).json({ success: true, message: "Slot removed", data: expert.availability.weekly.get(day) });
  } catch (err) {
    console.error("Error deleting weekly slot:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
