const generateMeetingId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const segment = (length) =>
        Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${segment(3)}-${segment(4)}-${segment(3)}`;
};

export default generateMeetingId;
