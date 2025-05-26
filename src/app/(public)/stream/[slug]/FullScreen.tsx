"use client";

const FullScreen = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const enterFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return <div onClick={enterFullscreen}>{children}</div>;
};

export default FullScreen;
