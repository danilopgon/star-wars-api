import { Toaster } from "react-hot-toast";

const MainToaster = () => {
  return (
    <Toaster
      position="top-center"
      gutter={8}
      containerStyle={{}}
      toastOptions={{
        duration: 5000,
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
      }}
    />
  );
};

export default MainToaster;
