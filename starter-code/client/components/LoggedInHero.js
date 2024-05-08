import Image from "next/image";
import Container from "./Container";
import heroImg from "./samplehero2.png";
import emergencyLogo from "../public/emergencylogo.png";

const LoggedInHero = (props) => {
  const handleEmergencyButtonClick = () => {
    props.handleEmergencyButtonClick();
    // Scrolls to the map but with a 50px gap at the top to give it some space 
    const y = props.mapRef.current.getBoundingClientRect().top
    window.scrollTo({ top: y - 50 + window.document.documentElement.scrollTop, behavior: 'smooth' })
  }
  return (
    <>
      <Container className="flex flex-wrap justify-center items-center h-full">
        <div className="flex flex-col items-center justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row mx-auto">
          <div className="max-w-2xl mb-8">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <button
                onClick={handleEmergencyButtonClick}
                className="flex items-center px-12 py-4 h-12 text-xl font-medium text-center text-white bg-red-600 rounded-md ">
                <Image
                  src={emergencyLogo}
                  width={24}
                  alt="Picture of man needing to use the bathroom"
                  className="mr-2 h-8"
                />
                Emergency
              </button>
              <p className="text-xl ml-24 my-4">Or</p>
              <input className="py-3 pl-6 pr-2 rounded-md text-lg" ref={props.inputRef} placeholder="Enter a location" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default LoggedInHero;