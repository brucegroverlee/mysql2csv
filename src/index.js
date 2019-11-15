import path from 'path';
import * as courses from './models/courses';
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: path.resolve(process.cwd(), 'dist', 'courses.csv'),
  header: [
    {id: 'university', title: 'UNIVERSITY'},
    {id: 'courseId', title: 'COURSE ID'},
    {id: 'courseName', title: 'COURSE NAME'},
    {id: 'lessonName', title: 'LESSON NAME'},
    {id: 'file', title: 'FILE'},
  ]
});

function getJson() {
  return new Promise((resolve, reject) => {
    const payload = [];
    console.log('Get all courses');
    courses.getList()
    .then((courses) => {
      debugger
      console.log('amount', courses.length);
      for(let course of courses) {
        const courseId = course.id;
        const courseName = course.name;
        const university = course.university;
        const lessons = JSON.parse(course.lessons);
        for(let lesson of lessons) {
          const lessonName = lesson.name;
          //for(let file of lesson.file_paths) {
          //  
          //}
          if ( typeof lesson.file_paths === 'object') {
            lesson.file_paths.forEach(file => {
              // console.log('courseId', courseId);
              // console.log('courseName', courseName);
              // console.log('lesson name', lessonName);
              // console.log('file', file);
              const line = {
                university,
                courseId,
                courseName,
                lessonName,
                file,
              };
              payload.push(line);
            });
          } else {
            const line = {
              university,
              courseId,
              courseName,
              lessonName,
              file: 'EMPTY',
            };
            payload.push(line);
          }
        }
      }
      resolve(payload);
    })
    .catch((error) => {
      console.error(error);
      reject(error);
    });
  });
}

function main() {
  (async () => {
    const json = await getJson();
    debugger
    await csvWriter.writeRecords(json);
    console.log('...Done');
  })();
}

main();