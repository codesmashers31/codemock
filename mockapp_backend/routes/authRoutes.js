import express from "express";
import { sendOtp, verifyOtp, registerUser, loginUser, authenticateToken, getProfile } from "../controllers/authController.js";
import { deleteBreakDate, deleteEducationEntry, deletePreviousExperience, deleteWeeklySlot, getAvailability, getEducation, getExpertProfile, getPersonalInfo, getProfessional, getSkillsAndExpertise, updateAvailability, updateEducation, updatePersonalInfo, updateProfessional, updateSkillsAndExpertise } from "../controllers/expertController.js";

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getProfile);
// expert routes
router.get("/profile", getExpertProfile)
router.get("/personalinfo",getPersonalInfo )
router.put("/personalinfo", updatePersonalInfo )
router.get("/education",getEducation )
router.put("/education", updateEducation )
router.delete("/education/:idx", deleteEducationEntry);
router.get("/profession",getProfessional )
router.put("/profession", updateProfessional )
router.delete("/profession/previous/:idx", deletePreviousExperience);
router.get("/skills", getSkillsAndExpertise )
router.put("/skills", updateSkillsAndExpertise )
router.get("/availability", getAvailability )
router.put("/availability", updateAvailability )
router.delete("/availability/delbreak", deleteBreakDate)
router.delete("/availability/delslot", deleteWeeklySlot)

export default router;