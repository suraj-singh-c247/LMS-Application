import CourseBoard from "../component/CourseBoard";
import PageLayout from "../component/PageLayout";

export default function CoursePage() {
  return (
    <PageLayout title={"Courses"}>
      <CourseBoard />
    </PageLayout>
  );
}
