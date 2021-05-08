export const joinUsers = (people, currentUsername) => {
    return people.map(p=> p.person.username).filter(un=>un !== currentUsername).join(", ");
};