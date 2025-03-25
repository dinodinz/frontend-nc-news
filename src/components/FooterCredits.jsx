import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

const FooterCredits = () => {
  return (
    <div className="footer-website-credits">
      <p className="footer-year-credits">© 2025 dinodin</p>
      <p className="footer-github-logo">
        <a href="https://github.com/dinodinz" target="__blank">
          <GithubLogo size={23} />
        </a>
      </p>
      <p className="footer-linkedin-logo">
        <a href="https://www.linkedin.com/in/dinodin/" target="__blank">
          <LinkedinLogo size={23} />
        </a>
      </p>
    </div>
  );
};

export default FooterCredits;
