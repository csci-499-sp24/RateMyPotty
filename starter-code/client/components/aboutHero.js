import Image from "next/image";
import Container from "./Container";
import heroImg from "./samplehero2.png";
import emergencyLogo from "../public/emergencylogo.png";

const AboutHero = (props) => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              NYC , we have your back
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              RateMyPotty is an app made to make your commute and restroom trips as seamless as possible. 
              Developed as a capstone project by a talented team of five upcoming developers, RateMyPotty aims to make your bathroom breaks stress-free and convenient.
               Whether you're on a road trip, exploring NYC, or simply out and about, RateMyPotty ensures that finding a restroom is just a few taps away.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Trusted by many <span className="text-indigo-600">New Yorkers</span>{" "}
            citywide
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">

          </div>
        </div>
      </Container>
      <Container>
        <div className="section">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Features</h2>
          <ul className="features-list mt-5 text-left text-gray-700 dark:text-white">
            <li>
              <strong>Location-Based Search:</strong> Instantly discover restrooms near you with our GPS-powered search functionality.
            </li>
            <li>
              <strong>Reviews and Ratings:</strong> Get insights from fellow users by reading and leaving reviews and ratings for restrooms.
            </li>
            <li>
              <strong>Filtering Options:</strong> Filter restrooms based on accessibility features, cleanliness, and more, to find the perfect restroom for your needs.
            </li>
            <li>
              <strong>Emergency Button:</strong> Instantly find the nearest restroom.
            </li>
          </ul>
        </div>
      </Container>
      <Container>
        <div className="section">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Our Team</h2>
          <ul className="team-list mt-5 text-center text-blue-500 underline">
            <li><a href="https://github.com/alexlehuynh">Alex</a></li>
            <li><a href="https://github.com/ConnieQiu">Connie</a></li>
            <li><a href="https://github.com/aLostPocky">Philip</a></li>
            <li><a href="https://github.com/craftylime">Giuseppina</a></li>
            <li><a href="https://github.com/DimiPrince">Dimitry</a></li>
          </ul>
        </div>
      </Container>
    </>
  );
}

function GitHubLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6 .113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.91-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
    </svg>
  );
}

export default AboutHero;