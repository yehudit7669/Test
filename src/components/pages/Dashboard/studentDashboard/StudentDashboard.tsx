
import StudentDashboardImg from "../../../../assets/images/div.cover-image.png";
import OpenQuestionWidget from "./openQuestionWidget";
import "./StudentDashboard.css"

export default function StudentDashboard() {

  return (
    <main className="StudentDashboard_mainWrapper">
      <div className="StudentDashboard_ImgWrapper">
        <img className="StudentDashBoard_CoverImg" src={StudentDashboardImg} />
      </div>
      <section className="StudentDashBoard_section">
        <OpenQuestionWidget/>
      </section>
    </main>
  );
}
