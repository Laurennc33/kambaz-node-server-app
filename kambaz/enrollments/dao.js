import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(user, course) {
  const enrollmentId = `${user}-${course}`;
  const existing = await model.findById(enrollmentId);
  if (existing) {
    throw new Error("User is already enrolled in this course.");
  }

  const newEnrollment = { user, course, _id: enrollmentId };
  return model.create(newEnrollment);
}

export async function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

export async function getUserEnrollments(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments;
}

