// routes/expertRoutes.js
import express from "express";
import {
  getExpertProfile,
  uploadProfilePhoto,
  getPersonalInfo,
  updatePersonalInfo,
  getEducation,
  updateEducation,
  deleteEducationEntry,
  getProfessional,
  updateProfessional,
  deletePreviousExperience,
  getSkillsAndExpertise,
  updateSkillsAndExpertise,
  getAvailability,
  updateAvailability,
  deleteBreakDate,
  deleteWeeklySlot,
  uploadVerificationDocs,
  uploadVerificationMiddleware
} from "../controllers/expertController.js";

import { authenticateToken } from "../controllers/authController.js";
import { uploadMiddleware } from "../middleware/upload.js";

const router = express.Router();

// Protect all expert routes
router.use(authenticateToken);

// Profile
router.get("/profile", getExpertProfile);
router.post("/profile/photo", uploadMiddleware.single("photo"), uploadProfilePhoto);

// The rest of your expert routes (implementations must exist in controller)
router.get("/personalinfo", getPersonalInfo);
router.put("/personalinfo", updatePersonalInfo);

router.get("/education", getEducation);
router.put("/education", updateEducation);
router.delete("/education/:idx", deleteEducationEntry);

router.get("/profession", getProfessional);
router.put("/profession", updateProfessional);
router.delete("/profession/previous/:idx", deletePreviousExperience);

router.get("/skills", getSkillsAndExpertise);
router.put("/skills", updateSkillsAndExpertise);

router.get("/availability", getAvailability);
router.put("/availability", updateAvailability);
router.delete("/availability/delbreak", deleteBreakDate);
router.delete("/availability/delslot", deleteWeeklySlot);

// Verification
router.put(
  "/verification",
  uploadVerificationMiddleware.fields([
    { name: "companyIdFile", maxCount: 1 },
    { name: "aadharFile", maxCount: 1 },
  ]),
  uploadVerificationDocs
);

export default router;
