export const canJoinMeeting = (meeting, userId) => {
    // console.log(`[Auth] Checking ${userId} against Exp:${meeting.expertId} / Can:${meeting.candidateId}`);
    return String(meeting.expertId) === String(userId) || String(meeting.candidateId) === String(userId);
};
