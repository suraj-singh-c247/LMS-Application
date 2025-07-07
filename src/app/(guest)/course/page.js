import CourseBoard from "@/app/component/CourseBoard";
import PageLayout from "@/app/component/PageLayout";
import styles from "@/app/style/page.module.css";
export default function CoursePage() {
  return (
    <main className={styles.main}>
      <PageLayout title={"Courses"}>
        <CourseBoard />
      </PageLayout>
    </main>
  );
}
