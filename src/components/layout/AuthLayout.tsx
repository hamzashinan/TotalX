import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  image: string;
  imagePosition?: "left" | "right";
}

function AuthLayout({
  children,
  image,
  imagePosition = "right",
}: Props) {
  const imageSection = (
    <div className="order-2 lg:order-none flex items-center justify-center bg-[#F7F7F7] p-8 min-h-[40vh] lg:min-h-screen">
      <div className="rounded-3xl bg-[#F2F2F2] p-8 lg:p-10 shadow-sm">
        <img
          src={image}
          alt="Authentication"
          className="w-56 sm:w-72 md:w-80 lg:w-[360px] h-auto object-contain"
        />
      </div>
    </div>
  );

  const formSection = (
    <div className="order-1 lg:order-none flex items-center justify-center px-6 py-10 lg:px-16 lg:py-0 min-h-[60vh] lg:min-h-screen">
      <div className="w-full max-w-[360px]">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {imagePosition === "left" ? (
        <>
          {imageSection}
          {formSection}
        </>
      ) : (
        <>
          {formSection}
          {imageSection}
        </>
      )}
    </div>
  );
}

export default AuthLayout;