import test from 'node:test';
import assert from 'node:assert/strict';
import Student from '../src/Student.js';
import { createAcademicReport } from '../src/academicReport.js';

test('Student calculates the average and maps every grade boundary', () => {
  const student = new Student(1, 'Ali', [70, 60, 80], 90);

  assert.equal(student.calculateAverage(), 70);
  assert.deepEqual(
    [90, 80, 70, 60, 50, 49].map((average) => student.getGrade(average)),
    ['A', 'B', 'C', 'D', 'E', 'F'],
  );
});

test('Student passes only when average and attendance meet the minimums', () => {
  const passingStudent = new Student(2, 'Sara', [50, 50, 50], 75);
  const lowAttendanceStudent = new Student(3, 'Omar', [90, 90, 90], 74);
  const lowAverageStudent = new Student(4, 'Maha', [49, 50, 50], 100);

  assert.equal(passingStudent.getFinalResult(), 'ناجح');
  assert.equal(lowAttendanceStudent.getFinalResult(), 'يحتاج مراجعة');
  assert.equal(lowAverageStudent.getFinalResult(), 'يحتاج مراجعة');
});

test('Academic report filters, adjusts, and averages only struggling students', () => {
  const students = [
    new Student(1, 'Ali', [80, 80, 80], 90),
    new Student(2, 'Sara', [40, 45, 49], 70),
    new Student(3, 'Omar', [46, 46, 46], 85),
    new Student(4, 'Maha', [20, 20, 20], 90),
    new Student(5, 'Nour', [40, 40, 40], 90),
    new Student(6, 'Hana', [49, 49, 49], 90),
    new Student(7, 'Ziad', [39, 39, 39], 90),
    new Student(8, 'Lina', [50, 50, 50], 90),
  ];
  const report = createAcademicReport(students);

  assert.equal(report.studentResults.length, 8);
  assert.deepEqual(report.strugglingStudents.map(({ id }) => id), [2, 3, 5, 6]);
  assert.deepEqual(
    report.mercyAdjustedStudents.map(({ adjustedAverage }) => Number(adjustedAverage.toFixed(2))),
    [49.67, 51, 45, 54],
  );
  assert.equal(Number(report.mercyAverage.toFixed(2)), 49.92);
  assert.deepEqual(students[1].grades, [40, 45, 49]);
});

test('Academic report returns a zero mercy average when no students qualify', () => {
  const report = createAcademicReport([
    new Student(1, 'Ali', [80, 80, 80], 90),
    new Student(2, 'Sara', [20, 20, 20], 90),
  ]);

  assert.equal(report.strugglingStudents.length, 0);
  assert.equal(report.mercyAverage, 0);
});
