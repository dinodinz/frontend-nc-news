import AllArticles from "../Article/AllArticles";

const MainContent = () => {
  return (
    <div className="flex flex-col w-[95%] bg-[hsla(219,79%,41%,0.13)] rounded-[15px] mt-[20px] pt-[20px] mb-[20px] relative">
      <AllArticles />
    </div>
  );
};

export default MainContent;
