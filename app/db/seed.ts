import db from "@/db/index";
import { courses, lessons, categories } from "@/db/schema";
import { COURSES } from "@/db/seedData";

async function main() {
  try {
    console.log(`Starting DB seed...`);

    for (const course of COURSES) {
      const createdCategory = await db
        .insert(categories)
        .values({
          name: course.category.name,
          description: course.category.description,
          slug: course.category.slug,
          image: "",
        })
        .returning({ insertedId: categories.id });

      if (createdCategory.length > 0) {
        const categoryID = createdCategory[0].insertedId;
        const createdCourse = await db
          .insert(courses)
          .values({
            name: course.name,
            description: course.description,
            slug: course.slug,
            image: course.image,
            level: course.level,
            lessonsCount: course.lessonsCount,
            categoryID: categoryID,
          })
          .returning({ insertedId: courses.id });

        if (course.lessons.length > 0 && createdCourse.length > 0) {
          const courseID = createdCourse[0].insertedId;
          const promises: Promise<unknown>[] = [];
          course.lessons.forEach((lesson) => {
            const res = db.insert(lessons).values({
              name: lesson.name,
              description: lesson.description,
              content: lesson.content,
              slug: lesson.slug,
              unit: lesson.unit,
              part: lesson.part,
              estimatedDuration: lesson.duration,
              courseID: courseID,
            });
            promises.push(res);
          });
          await Promise.all(promises);
        }
      }
    }

    console.log(`Finished`);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

void main();
