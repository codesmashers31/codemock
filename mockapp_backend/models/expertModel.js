import mongoose from "mongoose";

/* ----------------- Education Schema ------------------ */
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true, trim: true },
  institution: { type: String, required: true, trim: true },
  field: { type: String, trim: true },
  start: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  end: {
    type: Number,
    required: true,
    min: 1900,
    validate: {
      validator: function (value) {
        return value >= this.start;
      },
      message: "End year must be greater than or equal to start year",
    },
  },
}, { _id: false });

/* ----------------- Experience Schema ------------------ */
const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  start: { type: Number, required: true },
  end: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.start;
      },
      message: "End year must be greater than or equal to start year",
    },
  },
}, { _id: false });

/* ----------------- Availability Schema ------------------ */
const availabilitySchema = new mongoose.Schema({
  sessionDuration: { type: Number, default: 30 },

  maxPerDay: { type: Number, default: 1, min: 1 },

  weekly: {
    type: Map,
    of: [
      new mongoose.Schema(
        {
          from: { type: String, trim: true },
          to: { type: String, trim: true },
        },
        { _id: false }
      )
    ],
    default: {},
  },

  breakDates: {
    type: [
      {
        start: Date,
        end: Date
      }
    ],
    default: []
  }
});

/* ----------------- Expert Schema ------------------ */

const expertSchema = new mongoose.Schema(
  {
    profileImage: { type: String, trim: true },
    personalInformation: {
      userName: { type: String, required: true, trim: true },
      mobile: { type: String, required: true, trim: true },
      gender: { type: String, enum: ["Male", "Female", "Other"], default:"Male", required: true, trim: true },
      dob: { type: Date, required: true },
      country: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
    },

    education: {
      type: [educationSchema],
      default: []
    },

    professionalDetails: {
      title: { type: String, trim: true },
      company: { type: String, trim: true },
      totalExperience: { type: Number, min: 0 },
      industry: { type: String, trim: true },
      previous: { type: [experienceSchema], default: [] }
    },

    skillsAndExpertise: {
      mode: {
        type: String,
        enum: ["Online", "Offline", "Hybrid"],
        default: "Online",
        trim: true
      },
      domains: { type: [String], default: [] },
      tools: { type: [String], default: [] },
      languages: { type: [String], default: [] }
    },

    availability: {
      type: availabilitySchema,
      default: () => ({})
    },

    verification: {
      companyIdFile: { type: String, trim: true },
      aadharFile: { type: String, trim: true },
      linkedin: { type: String, trim: true }
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("ExpertDetails", expertSchema)

