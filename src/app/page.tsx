import PortfolioContainer from "../components/PortfolioContainer";
import {
  getProfile,
  getLocation,
  getContact,
  getSocialLinks,
  getProjects,
  getSkills,
} from "../db/queries";

export default async function Page() {
  const [
    profileList,
    locationList,
    contactList,
    socialLinks,
    projectsList,
    skillsList,
  ] = await Promise.all([
    getProfile(),
    getLocation(),
    getContact(),
    getSocialLinks(),
    getProjects(),
    getSkills(),
  ]);

  const profileData =
    profileList && profileList.length > 0 ? profileList[0] : null;

  return (
    <PortfolioContainer
      profileData={profileData}
      locationData={
        locationList && locationList.length > 0 ? locationList[0] : undefined
      }
      contactData={
        contactList && contactList.length > 0 ? contactList[0] : undefined
      }
      socialLinks={socialLinks}
      projectsData={projectsList}
      skillsData={skillsList}
    />
  );
}
