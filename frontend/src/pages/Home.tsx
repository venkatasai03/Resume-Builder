import { useNavigate } from "react-router-dom";
import ResizableNav from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import MagicButton from "@/components/ui/magic-button";
import { CircleArrowRight, LogIn } from "lucide-react";
import { FeaturesSection } from "@/components/ui/feature-section";
import { FaqSection } from "@/components/ui/faq-section";
import { motion } from "motion/react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { socialMedia, templates } from "@/constants";
import Footer from "@/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
      navigate("/login");
    });
  };
  const handleRegister = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 4000);
      navigate("/register");
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center p-6 font-sans">
      <ResizableNav />

      <div className="h-20"></div>

      <section className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6 border-b border-border">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-200 leading-tight">
          Build Stunning Resumes Effortlessly
        </h1>
        <p className="mt-5 text-xl text-gray-200 max-w-2xl">
          Use AI to generate job-winning resumes with customizable templates and
          instant PDF downloads.
        </p>

        <div className="flex flex-wrap justify-center mt-8 gap-6 z-0">
          <MagicButton
            title={"Register"}
            icon={<CircleArrowRight />}
            position="right"
            handleClick={handleRegister}
          />
          <MagicButton
            title={"Login"}
            icon={<LogIn />}
            position="right"
            handleClick={handleLogin}
          />
        </div>
      </section>
      <BackgroundBeams />

      <section
        className="w-full max-w-6xl flex flex-col items-center text-center py-24 px-6 border-b border-border"
        id="features"
      >
        <motion.div
          className="text-center space-y-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="uppercase text-lg tracking-widest text-gray-200 font-semibold">
            Features Section
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-200">
            Features <span className="text-green-400"> Of </span> Resume Builder
          </h2>
        </motion.div>
        <FeaturesSection />
      </section>

      <section
        className="w-full flex flex-col items-center text-center py-24 px-6 gap-5 border-b border-border"
        id="templates"
      >
        <motion.div
          className="text-center space-y-4 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="uppercase text-lg tracking-widest text-gray-200 font-semibold">
            Templates Section
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-200">
            Templates <span className="text-green-400"> Of </span> Resume
            Builder
          </h2>
        </motion.div>
        <div className="w-full flex flex-col justify-evenly items-center text-center py-24 px-6 md:flex-row">
          {templates.map((s) => (
            <CardContainer className="inter-var h-32 w-96">
              <CardBody className="dark:bg-gray-50 relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] dark:border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold dark:text-neutral-600 text-white"
                >
                  {s.title}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={s.link}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover object-top rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-8">
                  <CardItem
                    translateZ="50"
                    className="text-lg font-bold dark:text-neutral-600 text-white"
                  >
                    {s.description}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      <section
        className="w-full max-w-6xl flex flex-col items-center text-center py-14 px-6"
        id="faq"
      >
        <FaqSection />
      </section>

      <section
        className="w-full max-w-6xl flex flex-col items-center text-center py-14 px-6 border-b border-border"
        id="contact"
      >
        <motion.div
          className="text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="uppercase text-xs tracking-widest text-gray-300 font-semibold">
            My Socials
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Let&apos;s <span className="text-green-500">Connect </span>
          </h2>
        </motion.div>
        <div className="flex flex-col gap-5 md:flex-row lg:flex-row justify-center">
          {socialMedia.map((s) => (
            <MagicButton
              key={s.id}
              title={s.title}
              icon={s.icon}
              position="left"
              handleClick={() => {
                window.open(s.link, "_blank", "noopener,noreferrer");
              }}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
