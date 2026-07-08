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
    <div className="hidden lg:flex items-center justify-center bg-[#F5F5F7]">
      <img
        src={image}
        alt="Authentication"
        className="w-[420px] max-w-full"
      />
    </div>
  );

  const formSection = (
    <div className="flex items-center justify-center px-8">
      <div className="w-full max-w-md">{children}</div>
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