import Student from './Student.js';

const studentsList = [
  new Student(1, 'Ali', [78, 82, 90], 88),
  new Student(2, 'Sara', [52, 57, 49], 80),
  new Student(3, 'Omar', [42, 39, 44], 76),
  new Student(4, 'Maha', [46, 45, 44], 72),
];

console.log('=== تقرير الطلاب ===');
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${average.toFixed(2)} | التقدير: ${student.getGrade(average)} | النتيجة: ${student.getFinalResult()}`
  );
});

const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

const mercyAdjustedStudents = strugglingStudents.map((student) => {
  const adjustedAverage = student.calculateAverage() + 5;
  return {
    ...student,
    adjustedAverage,
    adjustedGrade: student.getGrade(adjustedAverage),
  };
});

const mercyTotal = mercyAdjustedStudents.reduce((sum, student) => sum + student.adjustedAverage, 0);
const mercyAverage = mercyAdjustedStudents.length ? mercyTotal / mercyAdjustedStudents.length : 0;

console.log('\n=== الطلاب المتعثرون الذين شملتهم الرأفة ===');
if (mercyAdjustedStudents.length) {
  mercyAdjustedStudents.forEach((student) => {
    console.log(
      `الاسم: ${student.name} | المتوسط الجديد: ${student.adjustedAverage.toFixed(2)} | التقدير: ${student.adjustedGrade}`
    );
  });
} else {
  console.log('لا يوجد طلاب متعثرون في القائمة.');
}

console.log(`\n=== متوسط درجات الطلاب المتعثرين بعد التعديل === ${Student.calculateMercyAverage(strugglingStudents).toFixed(2)}`);
console.log(`=== متوسط الرأفة المحسوب من المصفوفة المعدلة === ${mercyAverage.toFixed(2)}`);
