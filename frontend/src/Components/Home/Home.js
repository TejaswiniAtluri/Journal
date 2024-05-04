import React from "react";
import "./Home.css";
import backgroundImage from "c:/Users/tejas/Downloads/J2.jpg"; // Import the background image

function Home() {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="content">
        <h1>MY JOURNAL</h1>
        <p>
          Daily journaling is a powerful habit that can transform your life. By
          setting aside just a few minutes each day to reflect and write, you
          gain clarity, improve self-awareness, and track your personal growth.
          The process of journaling helps organize your thoughts, emotions, and
          goals, providing valuable insights into your mindset and behaviors.
          It's not just about recording events; it's about understanding
          yourself better.When you journal daily, you create a space for
          self-expression and introspection. This practice can enhance your
          problem-solving skills, as it encourages you to analyze challenges and
          identify potential solutions. Moreover, journaling can boost
          creativity and reduce stress by serving as a therapeutic outlet for
          your thoughts and feelings. To make journaling a consistent part of
          your routine, choose a time that works best for you—whether it's in
          the morning to set intentions for the day ahead or in the evening to
          reflect on your experiences. Keep your journaling sessions short and
          manageable, aiming for just a few minutes each day to start. Focus on
          writing freely without judgment, allowing your thoughts to flow
          naturally onto the pages.
        </p>
      </div>
    </div>
  );
}

export default Home;
