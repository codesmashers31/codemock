import { useEffect, useState } from "react";
import axios from "axios";
import { Card, IconButton, PrimaryButton, SecondaryButton } from '../pages/ExpertDashboard';

const ExpertAvailability = () => {

  const user = "69255389e1a38f2afd8f663d"; // Replace with dynamic userId


  const [profile, setProfile] = useState({
    availability: {
      sessionDuration: 30,
      maxPerDay: 1,
      weekly: {},
      breakDates: []
    }
  });


  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const dayLabel = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };

  /* ----------------- Fetch Availability (GET) ----------------- */
  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/availability", {
          headers: { userid: user }
        });

        const data = res.data.data;

        setProfile((p) => ({
          ...p,
          availability: {
            sessionDuration: data.sessionDuration || 30,
            maxPerDay: data.maxPerDay || 1,
            weekly: data.weekly || {},
            breakDates: data.breakDates || [],
          }
        }));
      } catch (err) {
        console.error("Error fetching availability:", err);
      }
    }

    fetchAvailability();
  }, []);

  /* ----------------- Calculate End Time ----------------- */
  function calculateEndTime(startTime, duration) {
    if (!startTime) return "";

    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate.getTime() + duration * 60000);

    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

    return `${endHours}:${endMinutes}`;
  }

  /* ----------------- Weekly Slot Management ----------------- */

  const addSlotForDay = (day) => {
    setProfile((p) => {
      const weekly = { ...p.availability.weekly };
      weekly[day] = [...(weekly[day] || []), { from: "", to: "" }];
      return { ...p, availability: { ...p.availability, weekly } };
    });
  };

  const updateSlotForDay = (day, idx, field, value) => {
    setProfile((p) => {
      const weekly = { ...p.availability.weekly };
      const slots = [...(weekly[day] || [])];

      if (field === "from") {
        const sessionDuration = p.availability.sessionDuration || 30;
        const endTime = calculateEndTime(value, sessionDuration);
        slots[idx] = { ...slots[idx], from: value, to: endTime };
      } else {
        slots[idx] = { ...slots[idx], [field]: value };
      }

      weekly[day] = slots;
      return { ...p, availability: { ...p.availability, weekly } };
    });
  };

const removeSlotForDay = async (day, idx) => {
  try {
    const slot = profile.availability.weekly[day][idx];

    // Call backend DELETE endpoint
    await axios.delete("http://localhost:3000/api/auth/availability/delslot", {
      headers: { userid: user },
      data: { day, from: slot.from } // identify slot by day + start time
    });

    // Remove from frontend state
    setProfile((p) => {
      const weekly = { ...p.availability.weekly };
      weekly[day] = weekly[day].filter((_, i) => i !== idx);
      return { ...p, availability: { ...p.availability, weekly } };
    });
  } catch (err) {
    console.error("Failed to delete weekly slot:", err);
    alert("Failed to delete slot");
  }
};


  /* ----------------- Break Dates ----------------- */

  const addBreakDate = (dateStr) => {
    if (!dateStr) return;
    setProfile((p) => ({
      ...p,
      availability: {
        ...p.availability,
        breakDates: [...p.availability.breakDates, { start: dateStr, end: dateStr }]
      }
    }));
  };

const removeBreakDate = async (idx) => {
  try {
    const breakDate = profile.availability.breakDates[idx];

    // Call backend DELETE endpoint
    await axios.delete("http://localhost:3000/api/auth/availability/delbreak", {
      headers: { userid: user },
      data: { start: breakDate.start } // send the start date
    });

    // Remove from frontend state
    setProfile((p) => ({
      ...p,
      availability: {
        ...p.availability,
        breakDates: p.availability.breakDates.filter((_, i) => i !== idx)
      }
    }));
  } catch (err) {
    console.error("Failed to delete break date:", err);
    alert("Failed to delete break date");
  }
};


  /* ----------------- Save Availability (PUT) ----------------- */

  const saveAvailability = async () => {
    try {
      const payload = profile.availability;

      const res = await axios.put(
        "http://localhost:3000/api/auth/availability",
        payload,
        {
          headers: { userid: user }
        }
      );

      alert("Availability saved successfully!", res);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save availability");
    }
  };

  /* ----------------- UI ----------------- */

  return (
    <>
   <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Availability & Scheduling</h3>
                <p className="text-sm text-gray-500 mt-1">Weekly slots, session duration and break dates</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration</label>
                  <select 
                    className="border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                    value={profile.availability.sessionDuration || 30} 
                    onChange={(e) => {
                      const newDuration = Number(e.target.value);
                      setProfile((p) => {
                        // Update all existing slots with new end times
                        const weekly = { ...p.availability.weekly };
                        Object.keys(weekly).forEach(day => {
                          weekly[day] = weekly[day].map(slot => ({
                            ...slot,
                            to: slot.from ? calculateEndTime(slot.from, newDuration) : slot.to
                          }));
                        });
                        
                        return { 
                          ...p, 
                          availability: { 
                            ...p.availability, 
                            sessionDuration: newDuration,
                            weekly 
                          } 
                        };
                      });
                    }}
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Sessions / Day</label>
                  <input type="number" min="1" className="border border-gray-300 rounded-md px-3 py-2.5 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={profile.availability.maxPerDay || 1} onChange={(e) => setProfile((p) => ({ ...p, availability: { ...p.availability, maxPerDay: Number(e.target.value) } }))} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Weekly Availability</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {days.map((d) => (
                    <div key={d} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-medium text-gray-900">{dayLabel[d]}</div>
                        <SecondaryButton onClick={() => addSlotForDay(d)}>+ Slot</SecondaryButton>
                      </div>

                      {(profile.availability.weekly[d] || []).length === 0 ? (
                        <div className="text-sm text-gray-500 text-center py-4">No slots</div>
                      ) : (
                        <div className="space-y-3">
                          {(profile.availability.weekly[d] || []).map((slot, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                                <input 
                                  type="time" 
                                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full" 
                                  value={slot.from || ""} 
                                  onChange={(e) => updateSlotForDay(d, i, "from", e.target.value)} 
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-xs text-gray-500 mb-1">End Time</label>
                                <input 
                                  type="time" 
                                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full bg-gray-50" 
                                  value={slot.to || ""} 
                                  readOnly
                                  title="Automatically calculated based on start time and session duration"
                                />
                              </div>
                              <IconButton onClick={() => removeSlotForDay(d, i)} className="self-end mb-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </IconButton>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Unavailable / Break Dates</h4>
                <div className="flex items-center gap-4 mb-4">
                  <input id="breakDateInput" type="date" className="border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  <SecondaryButton onClick={() => {
                    const el = document.getElementById("breakDateInput");
                    if (el?.value) addBreakDate(el.value);
                  }}>
                    Add Break Date
                  </SecondaryButton>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profile.availability.breakDates?.length === 0 && <div className="text-sm text-gray-500">No break dates</div>}
                  {profile.availability.breakDates?.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium">
                      {new Date(d.start).toLocaleDateString()}
                      <button onClick={() => removeBreakDate(i)} className="text-gray-500 hover:text-gray-700 ml-1 transition-colors duration-200">×</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <PrimaryButton onClick={saveAvailability}>Save Changes</PrimaryButton>
            </div>
          </Card>
    </>
  );
};

export default ExpertAvailability;
