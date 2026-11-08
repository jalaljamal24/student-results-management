export function createAcademicReport(students) {
  const studentResults = students.map((student) => {
    const average = student.calculateAverage();

    return {
      student,
      average,
      grade: student.getGrade(average),
      result: student.getFinalResult(),
    };
  });

  const strugglingStudents = students.filter((student) => {
    const average = student.calculateAverage();
    return average >= 40 && average <= 49;
  });

  const mercyAdjustedStudents = strugglingStudents.map((student) => {
    const originalAverage = student.calculateAverage();
    const adjustedAverage = originalAverage + 5;

    return {
      student,
      originalAverage,
      adjustedAverage,
      adjustedGrade: student.getGrade(adjustedAverage),
    };
  });

  const mercyTotal = mercyAdjustedStudents.reduce(
    (total, student) => total + student.adjustedAverage,
    0,
  );
  const mercyAverage = mercyAdjustedStudents.length
    ? mercyTotal / mercyAdjustedStudents.length
    : 0;

  return {
    studentResults,
    strugglingStudents,
    mercyAdjustedStudents,
    mercyAverage,
  };
}
