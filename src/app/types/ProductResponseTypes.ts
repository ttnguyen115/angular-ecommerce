import { Product } from "../common/product";
import { ProductCategory } from "../common/product-category";

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}

export { GetResponseProducts, GetResponseProductCategory };
