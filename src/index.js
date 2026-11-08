import Student from './Student.js';
import { createAcademicReport } from './academicReport.js';

const studentsList = [
  new Student(1, 'Jalal', [78, 82, 90], 88),
  new Student(2, 'Sara', [52, 57, 49], 80),
  new Student(3, 'Omar', [42, 39, 44], 76),
  new Student(4, 'Maha', [46, 45, 44], 72),
];
const {
  studentResults,
  strugglingStudents,
  mercyAdjustedStudents,
  mercyAverage,
} = createAcademicReport(studentsList);

console.log('========================================');
console.log('          تقرير الطلاب الأكاديمي');
console.log('========================================');

studentResults.forEach(({ student, average, grade, result }) => {
  console.log(`اسم الطالب: ${student.name}`);
  console.log(`المتوسط: ${average.toFixed(2)}`);
  console.log(`التقدير: ${grade}`);
  console.log(`الحالة: ${result}`);
  console.log('----------------------------------------');
});

console.log('\n========================================');
console.log('     الطلاب المتعثرون المستهدفون بالرأفة');
console.log('========================================');
console.log(
  'مصفوفة الطلاب بعد تطبيق الرأفة:',
  mercyAdjustedStudents.map(({ student, originalAverage, adjustedAverage, adjustedGrade }) => ({
    id: student.id,
    name: student.name,
    grades: student.grades,
    attendance: student.attendance,
    originalAverage,
    adjustedAverage,
    adjustedGrade,
  })),
);

if (mercyAdjustedStudents.length) {
  mercyAdjustedStudents.forEach(({ student, adjustedAverage, adjustedGrade }) => {
    console.log(`اسم الطالب: ${student.name}`);
    console.log(`المتوسط بعد الرأفة: ${adjustedAverage.toFixed(2)}`);
    console.log(`التقدير الجديد: ${adjustedGrade}`);
    console.log('----------------------------------------');
  });
} else {
  console.log('لا يوجد طلاب متعثرون في القائمة.');
}

console.log(`\nمتوسط المتعثرين بعد الرأفة: ${mercyAverage.toFixed(2)}`);
console.log('========================================');

if (typeof document !== 'undefined') {
  const setText = (selector, value) => {
    document.querySelector(selector).textContent = value;
  };

  const appendCells = (row, values) => {
    values.forEach(({ value, className = '' }) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      cell.className = className;
      row.append(cell);
    });
  };

  setText('#student-count', studentsList.length);
  setText('#passed-count', studentResults.filter(({ result }) => result === 'ناجح').length);
  setText('#mercy-count', mercyAdjustedStudents.length);
  setText('#mercy-average', mercyAverage.toFixed(2));

  const studentRows = document.querySelector('#student-rows');
  studentResults.forEach(({ student, average, grade, result }) => {
    const row = document.createElement('tr');
    appendCells(row, [
      { value: student.name, className: 'student-name' },
      { value: student.id },
      { value: student.grades.join(' / ') },
      { value: average.toFixed(2) },
      { value: grade },
      { value: `${student.attendance}%` },
      { value: result, className: result === 'ناجح' ? 'result-pass' : 'result-review' },
    ]);
    studentRows.append(row);
  });

  const mercyRows = document.querySelector('#mercy-rows');
  mercyAdjustedStudents.forEach(({ student, originalAverage, adjustedAverage, adjustedGrade }) => {
    const row = document.createElement('tr');
    appendCells(row, [
      { value: student.name, className: 'student-name' },
      { value: student.id },
      { value: originalAverage.toFixed(2) },
      { value: adjustedAverage.toFixed(2) },
      { value: adjustedGrade },
    ]);
    mercyRows.append(row);
  });

  document.querySelector('#mercy-table-wrap').hidden = mercyAdjustedStudents.length === 0;
  document.querySelector('#mercy-empty').hidden = mercyAdjustedStudents.length > 0;
}
