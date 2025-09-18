import { ImageBroken } from "@phosphor-icons/react";
import FooterCredits from "./FooterCredits";

const ErrorPage = () => {
  return (
    <div className="w-[95%] flex flex-col bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-[20px] pb-[20px] relative">
      <div className="flex flex-col items-center h-screen justify-center gap-4">
        <ImageBroken size={130} className="mb-[20px] text-[#ff646c]" />
        <p className="font-[900] tracking-[5px] text-[1.4rem]">Error 404</p>
        <p className="font-[900] tracking-[5px] text-[1.4rem]">
          Page Not Found
        </p>
      </div>
      <FooterCredits />
    </div>
  );
};

export default ErrorPage;
