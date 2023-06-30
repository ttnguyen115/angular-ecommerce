import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Product } from "../common/product";
import { ProductCategory } from "../common/product-category";
import {
  GetResponseProductCategory,
  GetResponseProducts,
} from "../types/ProductResponseTypes";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) {}

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(
    pageNumber: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products/search/findByCategoryId?id=${categoryId}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(searchKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${searchKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(
    pageNumber: number,
    pageSize: number,
    keyword: string
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/products/search/findByNameContaining?name=${keyword}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const categoryUrl = `${this.baseUrl}/product-category`;

    return this.httpClient
      .get<GetResponseProductCategory>(categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  getProductById(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/products/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  private getProducts(queryUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(queryUrl)
      .pipe(map((response) => response._embedded.products));
  }
}
