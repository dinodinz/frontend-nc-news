import { ImageBroken } from "@phosphor-icons/react";

const ErrorPage = () => {
  return (
    <div className="loading-msg-container">
      <ImageBroken size={130} />
      <p className="loading-msg">Error 404</p>
      <p className="loading-msg">Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
