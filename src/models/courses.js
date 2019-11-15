import db from '../db/mysql';

export function getList() {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
    courses.id AS id,
    courses.name,
    universities.short_name AS university,
    courses.lessons
    FROM courses, universities 
    WHERE 
    courses.university_id = universities.id
    AND courses.deleted_at is null
    ORDER BY id;`;

    db.query(query, async function (error, results, fields) {
      if (error) {
        console.error(error);
        reject(error);
      }
      if (results.length===0) {
        console.log(`Not found entities.`);
        resolve(null);
      } else {
        resolve(results);
      }
    });
  });
}