import Database from "../database/index.js";
import { v4 as uuidv4 } from "uuid";


export function findAllAssignments() {
    const { assignments } = Database;
    return assignments;
}


export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((a) => a._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}

export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments.push(newAssignment); // Make sure it's stored properly
    console.log("New assignment created:", newAssignment); // 🔍 Debug log
    return newAssignment;
}


export function findAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    console.log("All assignments in DB:", assignments); // 🔍 Debug log
    console.log("Searching for courseId:", courseId); // 🔍 Debug log
    
    const result = assignments.filter((assignment) => assignment.course === courseId);
    console.log("Filtered assignments:", result); // 🔍 Debug log

    return result;
}




