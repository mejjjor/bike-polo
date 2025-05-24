"use client";

const FullScreen = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const enterFullscreen = () => {
    document.documentElement.requestFullscreen();
  };

  return <div onClick={enterFullscreen}>{children}</div>;
};

export default FullScreen;
