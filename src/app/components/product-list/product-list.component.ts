import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { Product } from "../../common/product";
import { ActivatedRoute } from "@angular/router";
import { GetResponseProducts } from "../../types/ProductResponseTypes";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list-grid.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  previousCategoryId: number = 1;
  currentCategoryId: number = 1;
  previousKeyword: string = "";
  searchMode: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const searchKeyword: string = this.route.snapshot.paramMap.get("keyword")!;

    if (this.previousKeyword != searchKeyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = searchKeyword;

    this.productService
      .searchProductsPaginate(this.pageNumber - 1, this.pageSize, searchKeyword)
      .subscribe(this.processResponse());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has("id");
    this.currentCategoryId = hasCategoryId
      ? Number(this.route.snapshot.paramMap.get("id"))
      : 1;

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService
      .getProductListPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResponse());
  }

  updatePageSize(pageSizeSelected: string) {
    this.pageSize = Number(pageSizeSelected);
    this.pageNumber = 1;
    this.listProducts();
  }

  private processResponse(): (response: GetResponseProducts) => void {
    return (response: GetResponseProducts) => {
      const {
        _embedded: { products },
        page: { totalElements, size, number },
      } = response;
      this.products = products;
      this.pageNumber = number + 1;
      this.pageSize = size;
      this.totalElements = totalElements;
    };
  }
}
