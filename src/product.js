// import BodyContent from "./classification-body";
import { FlexWrapper } from "./flex-main-wrapper";
import { ProductBodyContent } from "./product-body";
export const Product = () => {
  return (
    <>
      <FlexWrapper BodyContent={<ProductBodyContent />} />
    </>
  );
};
