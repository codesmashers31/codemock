export const canJoinMeeting = (meeting, userId) => {
    return meeting.expertId === userId || meeting.candidateId === userId;
};
